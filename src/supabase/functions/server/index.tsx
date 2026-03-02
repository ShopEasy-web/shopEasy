import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Create Supabase client with service role key for admin operations
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods - must come before other routes
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: false,
  }),
);

// Explicit OPTIONS handler for preflight requests
app.options("/*", (c) => {
  return c.text("", 204);
});

// Simple password check (in production, use proper auth with hashing)
const ADMIN_PASSWORD = "shopspot2024"; // Change this password!

function checkAdminAuth(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// Health check endpoint
app.get("/make-server-96ec88bb/health", (c) => {
  return c.json({ status: "ok" });
});

// Get settings (PUBLIC) - used by settings.ts
app.get("/make-server-96ec88bb/settings", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("app_settings")
      .select("*")
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error("Get settings error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Return settings in the format expected by settings.ts
    // Extract site_settings JSONB column if it exists
    const settings = data?.site_settings || {};
    
    return c.json({
      settings: settings
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save settings (PUBLIC) - used by settings.ts
app.post("/make-server-96ec88bb/settings", async (c) => {
  try {
    const { settings } = await c.req.json();
    const supabase = getSupabaseClient();
    
    // First, get the existing settings to get the ID
    const { data: existingSettings } = await supabase
      .from("app_settings")
      .select("id")
      .limit(1)
      .single();
    
    let result;
    
    if (existingSettings?.id) {
      // Update existing settings - store in site_settings JSONB column
      result = await supabase
        .from("app_settings")
        .update({ 
          site_settings: settings,
          last_updated: new Date().toISOString()
        })
        .eq("id", existingSettings.id)
        .select()
        .single();
    } else {
      // Insert new settings - store in site_settings JSONB column
      result = await supabase
        .from("app_settings")
        .insert({ 
          site_settings: settings,
          last_updated: new Date().toISOString()
        })
        .select()
        .single();
    }
    
    const { data, error } = result;
    
    if (error) {
      console.error("Save settings error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, settings: data.site_settings });
  } catch (error) {
    console.error("Save settings error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Submit contact form (PUBLIC)
app.post("/make-server-96ec88bb/contact", async (c) => {
  try {
    const body = await c.req.json();
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        status: 'unread',
      })
      .select()
      .single();
    
    if (error) {
      console.error("Contact form submission error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Message received", data });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Submit training request (PUBLIC)
app.post("/make-server-96ec88bb/training", async (c) => {
  try {
    const body = await c.req.json();
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("training_requests")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        business_name: body.businessName,
        location: body.location,
        branches: body.branches || null,
        preferred_date: body.preferredDate || null,
        message: body.message || null,
        status: 'unread',
      })
      .select()
      .single();
    
    if (error) {
      console.error("Training request submission error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Training request received", data });
  } catch (error) {
    console.error("Training request submission error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get app settings (PUBLIC)
app.get("/make-server-96ec88bb/app-settings", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("app_settings")
      .select("*")
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error("Get app settings error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Return default values if no settings exist
    if (!data) {
      return c.json({
        playStoreUrl: "",
        appStoreUrl: "",
        apkDownloadUrl: "",
        apkVersion: "",
        lastUpdated: "",
      });
    }
    
    return c.json({
      playStoreUrl: data.play_store_url || "",
      appStoreUrl: data.app_store_url || "",
      apkDownloadUrl: data.apk_download_url || "",
      apkVersion: data.apk_version || "",
      lastUpdated: data.last_updated || "",
    });
  } catch (error) {
    console.error("Get app settings error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Admin login
app.post("/make-server-96ec88bb/admin/login", async (c) => {
  try {
    const { password } = await c.req.json();
    
    if (checkAdminAuth(password)) {
      return c.json({ success: true, token: password }); // Using password as token for simplicity
    } else {
      return c.json({ success: false, error: "Invalid password" }, 401);
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all contact messages (ADMIN ONLY)
app.get("/make-server-96ec88bb/admin/contacts", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Get contacts error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Transform data to match AdminDashboard expected format
    const contacts = (data || []).map((item: any) => ({
      key: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone || "",
      subject: item.subject,
      message: item.message,
      createdAt: item.created_at,
      status: item.status,
    }));
    
    return c.json({ success: true, contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all training requests (ADMIN ONLY)
app.get("/make-server-96ec88bb/admin/training", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("training_requests")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Get training requests error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Transform data to match AdminDashboard expected format
    const requests = (data || []).map((item: any) => ({
      key: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      businessName: item.business_name,
      location: item.location,
      branches: item.branches || "",
      preferredDate: item.preferred_date || "",
      message: item.message || "",
      createdAt: item.created_at,
      status: item.status,
    }));
    
    return c.json({ success: true, requests });
  } catch (error) {
    console.error("Get training requests error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update app settings (ADMIN ONLY)
app.post("/make-server-96ec88bb/admin/app-settings", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const body = await c.req.json();
    const supabase = getSupabaseClient();
    
    // First, get the existing settings to get the ID
    const { data: existingSettings } = await supabase
      .from("app_settings")
      .select("id")
      .limit(1)
      .single();
    
    const settingsData = {
      play_store_url: body.playStoreUrl || "",
      app_store_url: body.appStoreUrl || "",
      apk_download_url: body.apkDownloadUrl || "",
      apk_version: body.apkVersion || "",
      last_updated: new Date().toISOString(),
    };
    
    let result;
    
    if (existingSettings?.id) {
      // Update existing settings
      result = await supabase
        .from("app_settings")
        .update(settingsData)
        .eq("id", existingSettings.id)
        .select()
        .single();
    } else {
      // Insert new settings
      result = await supabase
        .from("app_settings")
        .insert(settingsData)
        .select()
        .single();
    }
    
    const { data, error } = result;
    
    if (error) {
      console.error("Update app settings error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Transform data to match AdminDashboard expected format
    const settings = {
      playStoreUrl: data.play_store_url || "",
      appStoreUrl: data.app_store_url || "",
      apkDownloadUrl: data.apk_download_url || "",
      apkVersion: data.apk_version || "",
      lastUpdated: data.last_updated || "",
    };
    
    return c.json({ success: true, message: "App settings updated", settings });
  } catch (error) {
    console.error("Update app settings error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete contact message (ADMIN ONLY)
app.delete("/make-server-96ec88bb/admin/contacts/:key", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const key = c.req.param("key");
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", key);
    
    if (error) {
      console.error("Delete contact error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete training request (ADMIN ONLY)
app.delete("/make-server-96ec88bb/admin/training/:key", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const key = c.req.param("key");
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from("training_requests")
      .delete()
      .eq("id", key);
    
    if (error) {
      console.error("Delete training request error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Training request deleted" });
  } catch (error) {
    console.error("Delete training request error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Mark contact message as read (ADMIN ONLY)
app.post("/make-server-96ec88bb/admin/contacts/:key/mark-read", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const key = c.req.param("key");
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: 'read' })
      .eq("id", key);
    
    if (error) {
      console.error("Mark contact as read error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Contact marked as read" });
  } catch (error) {
    console.error("Mark contact as read error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Mark training request as read (ADMIN ONLY)
app.post("/make-server-96ec88bb/admin/training/:key/mark-read", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const password = authHeader?.replace("Bearer ", "");
    
    if (!password || !checkAdminAuth(password)) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const key = c.req.param("key");
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from("training_requests")
      .update({ status: 'read' })
      .eq("id", key);
    
    if (error) {
      console.error("Mark training request as read error:", error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    return c.json({ success: true, message: "Training request marked as read" });
  } catch (error) {
    console.error("Mark training request as read error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = "tjnagdjelhjyqalistir.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbmFnZGplbGhqeXFhbGlzdGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4ODI4MDMsImV4cCI6MjAwMzQ1ODgwM30.ZIOIYnlQNU7YJ6LetL3Q52lINa1LFlk2YoJedy5mC9c";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.default = supabase;

const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');
const {
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceRoleKey,
} = require('./env');

function createSupabaseClient(accessToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    realtime: {
      transport: WebSocket,
    },
  });
}

const supabase = createSupabaseClient();

const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      realtime: {
        transport: WebSocket,
      },
    })
  : null;

module.exports = {
  supabase,
  supabaseAdmin,
  createSupabaseClient,
};

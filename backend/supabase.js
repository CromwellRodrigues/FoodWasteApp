
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Log environment variables for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Loaded' : 'Not Loaded');

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export Supabase client
export { supabase };

// Function to create an item in the food_inventory table
export const createItem = async (item) => {
  // Ensure the item object contains all required fields
  const requiredFields = ['name', 'category', 'stored_location', 'expiry_date', 'quantity'];
  for (const field of requiredFields) {
    if (!item[field]) {
      console.error(`Missing required field: ${field}`);
      return null;
    }
  }

  // Insert the item into the food_inventory table
  const { data, error } = await supabase
    .from('food_inventory')
    .insert([item]);

  // Log the entire response for debugging
  console.log('Supabase response:', { data, error });

  if (error) {
    console.error('Error creating item:', error.message, error.details, error.hint);
    return null;
  }
  return data;
};

// Function to get items from the food_inventory table
export const getItems = async () => {
  const { data, error } = await supabase
    .from('food_inventory')
    .select('*');
  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }
  return data;
};

// export const updateItem = async (itemId, updatedData) => {
//   const { data, error } = await supabase
//     .from('food_inventory')
//     .update(updatedData)
//     .eq('item_id', itemId);
//   if (error) {
//     console.error('Error updating item:', error);
//     return null;
//   }
//   return data;
// };

// export const deleteItem = async (itemId) => {
//   const { data, error } = await supabase
//     .from('food_inventory')
//     .delete()
//     .eq('item_id', itemId);
//   if (error) {
//     console.error('Error deleting item:', error);
//     return null;
//   }
//   return data;
// };
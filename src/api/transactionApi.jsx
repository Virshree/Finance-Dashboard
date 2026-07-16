import { supabase } from "../supabase";

// Get all transactions
export const getTransactions = async () => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
};

// Add transaction
export const addTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select();

  if (error) throw error;

  return data[0];
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
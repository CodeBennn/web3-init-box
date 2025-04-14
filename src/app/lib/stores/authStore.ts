import { create } from "zustand";
import { supabase } from "../supabase";

interface AuthState {
  user: any;
  session: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: any;
  signUp: (email: string, password: string) => Promise<void>;
}

type userType = {
  email: string;
  password: string;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ user: data.user, session: data.session });
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, session: null });
  },

  signUp: async (data: any) => {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      alert("注册错误:" + error?.message);
    } else {
      alert("注册成功，请检查邮箱验证");
    }
  },

  checkAuth: async () => {
    // 获取当前会话
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null });

    // 设置认证状态监听
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      set({ session, user: session?.user ?? null });
    });

    return () => {
      subscription?.unsubscribe();
    };
  },
}));

"use client";

import React, { ReactNode } from "react";
import { create } from "zustand";

interface DarkModeState {
	darkMode: boolean | null;
	setDarkMode: (choice: boolean) => void;
	getSystemPreference: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
	darkMode: null,
	setDarkMode: (choice) => set({ darkMode: choice }),
	getSystemPreference: () => {
		const pref = window.matchMedia("(prefers-color-scheme: dark)").matches;
		set({ darkMode: pref });
	},
}));

export default function DarkModeProvider({ children }: { children: ReactNode }) {
	const { darkMode } = useDarkModeStore();

	if (darkMode === null) return null;

	return <div className={`${darkMode ? "dark" : ""} min-h-[100%] min-w-[100%] h-[100vh] w-[100vw] flex`}>{children} </div>;
}

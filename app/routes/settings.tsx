import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import {
  CogIcon,
  BellIcon,
  GlobeAltIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    storeName: "E-Commerce Store",
    storeEmail: "admin@ecommerce.com",
    currency: "USD",
    timezone: "UTC",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    integrations: {
      analytics: true,
      marketing: false,
      socialMedia: true,
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleDirectSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const SettingSection = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <div className="w-5 h-5 text-indigo-600 dark:text-indigo-400">
              {icon}
            </div>
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Store Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure your e-commerce store settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <SettingSection title="General Settings" icon={<CogIcon />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) =>
                  handleDirectSettingChange("storeName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Store Email
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) =>
                  handleDirectSettingChange("storeEmail", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    handleDirectSettingChange("currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    handleDirectSettingChange("timezone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Theme Settings */}
        <SettingSection title="Theme Settings" icon={<GlobeAltIcon />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme Mode
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    theme === "light"
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    theme === "dark"
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auto Theme
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoTheme"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="autoTheme"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Automatically switch theme based on system preference
                </label>
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection title="Notification Settings" icon={<BellIcon />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive order updates via email
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "notifications",
                    "email",
                    !settings.notifications.email
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Push Notifications
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive browser push notifications
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "notifications",
                    "push",
                    !settings.notifications.push
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.push
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  SMS Notifications
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive order updates via SMS
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "notifications",
                    "sms",
                    !settings.notifications.sms
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.sms
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.sms
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security Settings" icon={<ShieldCheckIcon />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add an extra layer of security
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "security",
                    "twoFactorAuth",
                    !settings.security.twoFactorAuth
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.security.twoFactorAuth
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.security.twoFactorAuth
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    "security",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="5"
                max="480"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) =>
                  handleSettingChange(
                    "security",
                    "passwordExpiry",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="30"
                max="365"
              />
            </div>
          </div>
        </SettingSection>

        {/* Integration Settings */}
        <SettingSection title="Integration Settings" icon={<CreditCardIcon />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Analytics
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Track store performance
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "integrations",
                    "analytics",
                    !settings.integrations.analytics
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.integrations.analytics
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.integrations.analytics
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Marketing Tools
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enable marketing integrations
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "integrations",
                    "marketing",
                    !settings.integrations.marketing
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.integrations.marketing
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.integrations.marketing
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Social Media
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Connect social media accounts
                </p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    "integrations",
                    "socialMedia",
                    !settings.integrations.socialMedia
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.integrations.socialMedia
                    ? "bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.integrations.socialMedia
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingSection>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}

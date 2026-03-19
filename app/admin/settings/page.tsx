"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, Globe, Palette, Database } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "DeeTours",
    siteEmail: "support@deetours.in",
    siteUrl: "https://deetours.in",
    alertEmail: "admin@deetours.in",
    enableNotifications: true,
    enableAnalytics: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-hero text-primary-dark">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your DeeTours admin dashboard settings</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            General Settings
          </CardTitle>
          <CardDescription>Site information and basic configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Site Name</label>
            <Input
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              placeholder="Your site name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Site URL</label>
            <Input
              name="siteUrl"
              value={settings.siteUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Support Email</label>
            <Input
              name="siteEmail"
              type="email"
              value={settings.siteEmail}
              onChange={handleChange}
              placeholder="support@example.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Email and alert preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Alert Email</label>
            <Input
              name="alertEmail"
              type="email"
              value={settings.alertEmail}
              onChange={handleChange}
              placeholder="admin@example.com"
            />
            <p className="text-xs text-slate-500 mt-1">
              Receive notifications about new leads and bookings
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium text-slate-900">Enable Email Notifications</p>
              <p className="text-sm text-slate-500">Get daily summary of new leads</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              name="enableAnalytics"
              checked={settings.enableAnalytics}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium text-slate-900">Enable Analytics</p>
              <p className="text-sm text-slate-500">Help us improve by sharing usage data</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Authentication and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900">Two-Factor Authentication</p>
            <p className="text-sm text-blue-800 mt-1">
              Adding extra security to your admin account
            </p>
            <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Enable 2FA</Button>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="font-medium text-amber-900">Active Sessions</p>
            <p className="text-sm text-amber-800 mt-1">
              You are currently logged in from 1 device
            </p>
            <Button variant="outline" className="mt-3">
              View All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Backup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data & Backup
          </CardTitle>
          <CardDescription>Manage your data and backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Last backup: March 20, 2025 at 3:45 AM
          </p>
          <div className="flex gap-2">
            <Button variant="outline">↓ Export Data</Button>
            <Button variant="outline">⚙️ Backup Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription>Critical actions that cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg">
            <p className="font-medium text-red-900">Delete All Data</p>
            <p className="text-sm text-red-800 mt-1">
              Permanently delete all trips, leads, and bookings
            </p>
            <Button className="mt-3 bg-red-600 hover:bg-red-700">Delete Everything</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-2 sticky bottom-0 bg-white py-4 border-t border-slate-200">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent-luxury hover:bg-opacity-90"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Copy, Check, Download } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

interface MediaItem {
  id: string;
  url: string;
  title: string;
  size: string;
  date: string;
  category: string;
}

const mockMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Mountain Vista",
    size: "2.4 MB",
    date: "2025-03-15",
    category: "trips",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1503803735170-ce0efda954d3?w=400&h=300&fit=crop",
    title: "Adventure Shot",
    size: "1.8 MB",
    date: "2025-03-10",
    category: "blog",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=400&h=300&fit=crop",
    title: "Landscape",
    size: "3.2 MB",
    date: "2025-03-08",
    category: "hero",
  },
];

export default function MediaManagerPage() {
  const [uploadedImages, setUploadedImages] = useState<MediaItem[]>(mockMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMedia = uploadedImages.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setUploadedImages(uploadedImages.filter((item) => item.id !== id));
    toast.success("Image deleted");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-hero text-primary-dark">Media Gallery</h1>
        <p className="text-slate-600 mt-2">
          {uploadedImages.length} images • {(uploadedImages.length * 2.4).toFixed(1)} MB used
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Upload new images to your media library</CardDescription>
        </CardHeader>
        <CardContent>
          <CldUploadWidget
            uploadPreset="deetours_upload"
            multiple
            onSuccess={(result: any) => {
              const newImage: MediaItem = {
                id: Date.now().toString(),
                url: result.info.secure_url,
                title: result.info.original_filename,
                size: `${(result.info.bytes / 1024 / 1024).toFixed(1)} MB`,
                date: new Date().toISOString().split("T")[0],
                category: "trips",
              };
              setUploadedImages([newImage, ...uploadedImages]);
              toast.success("Image uploaded!");
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="w-full px-6 py-12 border-2 border-dashed border-slate-300 rounded-lg hover:border-accent-luxury hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">Drag and drop images here</p>
                  <p className="text-sm text-slate-500">or click to select from your computer</p>
                </div>
              </button>
            )}
          </CldUploadWidget>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "trips", "blog", "hero", "gallery"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-accent-luxury text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-slate-200 overflow-hidden group">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-5 h-5 text-slate-900" />
                </a>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="font-medium text-slate-900 truncate">{item.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {item.size} • {item.date}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(item.url, item.id)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:border-accent-luxury hover:text-accent-luxury transition-colors flex items-center justify-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy URL
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600">No images in this category yet</p>
        </div>
      )}
    </div>
  );
}

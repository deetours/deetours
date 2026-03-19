"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with Convex queries when blog schema is ready
const mockBlogPosts = [
  {
    id: "1",
    title: "Top 10 Hidden Gems in Nepal",
    slug: "top-10-hidden-gems-nepal",
    status: "published",
    excerpt: "Discover the lesser-known treasures of Nepal...",
    author: "Admin",
    views: 245,
    date: "2025-03-18",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Why Adventure Travel Changed My Life",
    slug: "adventure-travel-life-changing",
    status: "published",
    excerpt: "A personal journey through the mountains...",
    author: "Admin",
    views: 189,
    date: "2025-03-15",
    image: "https://images.unsplash.com/photo-1503803735170-ce0efda954d3?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Sustainable Tourism: A Guide",
    slug: "sustainable-tourism-guide",
    status: "draft",
    excerpt: "How to travel responsibly...",
    author: "Admin",
    views: 0,
    date: "2025-03-20",
    image: null,
  },
];

export default function BlogManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-hero text-primary-dark">Blog Management</h1>
          <p className="text-slate-600 mt-2">
            {mockBlogPosts.length} posts •{" "}
            {mockBlogPosts.filter((p) => p.status === "published").length} published
          </p>
        </div>
        <Link
          href="/admin/blog/create"
          className="flex items-center gap-2 px-6 py-3 bg-accent-luxury text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {post.image && (
              <div className="h-48 bg-slate-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-4 space-y-3">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    className={
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {post.status}
                  </Badge>
                  <span className="text-xs text-slate-500">{post.views} views</span>
                </div>
                <h3 className="font-semibold text-slate-900 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-600 hover:text-accent-luxury hover:bg-amber-50 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                  <button className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

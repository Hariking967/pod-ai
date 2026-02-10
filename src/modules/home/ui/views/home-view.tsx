"use client"

import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Search, Plus, LogOut, Loader2, User, Podcast } from 'lucide-react';
import Link from 'next/link';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Type definition for Meeting
interface Meeting {
    id: string;
    title: string;
    description: string;
    author: string;
    category: string;
    timeAgo: string;
    color: string;
}

export default function HomeView() {
  const router = useRouter();
  const {data, isPending} = authClient.useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("public");

  React.useEffect(() => {
    const fetchMeetings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/project/list?privacy=${activeTab}`);
            const json = await res.json();
            if (json.success) {
                setMeetings(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch meetings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchMeetings();
  }, [activeTab]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => router.push('/')
        }
    });
  };

  // Filter meetings based on search query
  const filteredMeetings = meetings.filter(meeting => 
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-tr from-primary to-secondary text-primary-foreground p-1.5 rounded-lg shadow-[0_0_15px_rgba(124,124,255,0.5)]">
                    <Mic className="h-5 w-5 text-white" />
                </div>
                <span className="text-foreground">PodAI</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                    <div className="bg-primary/20 p-1 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{data?.user.name}</span>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 md:px-6 py-8 md:py-12 space-y-8">
        
        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search podcasts..." 
                    className="pl-10 bg-card border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-full" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            <Link href="/create" className="w-full sm:w-auto">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(124,124,255,0.3)] transition-all rounded-full gap-2 text-white font-medium">
                    <Plus className="h-4 w-4" />
                    Create Podcast
                </Button>
            </Link>
        </div>

        {/* Meetings List with Tabs */}
        <div className="space-y-6">
            <Tabs defaultValue="public" onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                        <TabsTrigger value="public">Public Feeds</TabsTrigger>
                        <TabsTrigger value="private">My Private Feeds</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="public" className="space-y-6">
                     {/* Public Grid */}
                     <PodcastGrid isLoading={isLoading} meetings={filteredMeetings} searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="private" className="space-y-6">
                    {/* Private Grid */}
                    <PodcastGrid isLoading={isLoading} meetings={filteredMeetings} searchQuery={searchQuery} />
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  )
}

function PodcastGrid({ isLoading, meetings, searchQuery }: { isLoading: boolean, meetings: Meeting[], searchQuery: string }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (meetings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border/50 bg-muted/10">
                <Podcast className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No podcasts found</h3>
                <p className="text-muted-foreground text-sm max-w-sm mt-2">
                    {searchQuery ? `No results for "${searchQuery}"` : "There are no podcasts in this feed yet."}
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((meeting) => (
                <div key={meeting.id} className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,124,255,0.1)] transition-all cursor-pointer">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${meeting.color === 'primary' ? 'primary' : 'secondary'}/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${meeting.color === 'primary' ? 'primary' : 'secondary'}/10 transition-colors`} />
                    
                    <div className="flex items-start justify-between mb-4">
                        <div className={`bg-${meeting.color === 'primary' ? 'primary' : 'secondary'}/10 p-3 rounded-xl text-${meeting.color === 'primary' ? 'primary' : 'secondary'} group-hover:scale-110 transition-transform`}>
                            <Mic className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {meeting.timeAgo}
                        </span>
                    </div>
                    
                    <h3 className={`font-semibold text-lg mb-2 group-hover:text-${meeting.color === 'primary' ? 'primary' : 'secondary'} transition-colors line-clamp-1`}>{meeting.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {meeting.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                        <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {meeting.author}
                        </span>
                        <span className={`bg-${meeting.color === 'primary' ? 'secondary' : 'primary'}/10 text-${meeting.color === 'primary' ? 'secondary' : 'primary'} px-2 py-0.5 rounded-full`}>
                            {meeting.category}
                        </span>
                    </div>
                </div>
            ))}
             {/* "Create New" prompt card always appended if list is not empty */}
             <Link href="/create" className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 p-6 text-center hover:bg-muted/5 transition-colors group cursor-pointer h-full min-h-[200px]">
                <div className="bg-muted p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-base">Create New</h3>
                <p className="text-xs text-muted-foreground mt-1">
                    Start a new discussion
                </p>
            </Link>
        </div>
    )
}

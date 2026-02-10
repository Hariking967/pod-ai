"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Calendar, Clock, Mic, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

// Schema matching backend validation
const formSchema = z.object({
  name: z.string().min(1, "Title is required"),
  startTime: z.string().refine((val) => {
    const date = new Date(val);
    const now = new Date();
    // Allow 1 minute buffer for "now"
    return date.getTime() > now.getTime() - 60000; 
  }, "Start time cannot be in the past"),
  duration: z.coerce.number().int().positive().lt(120, "Duration must be less than 2 hours (120 minutes)"),
  actorPrompt: z.string().min(10, "Actor prompt must be at least 10 characters"),
  criticPrompt: z.string().min(10, "Critic prompt must be at least 10 characters"),
  isPublic: z.boolean(),
})

export default function CreatePodcastPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startTime: "",
      duration: 30,
      actorPrompt: "You are an enthusiastic advocate for this topic. You see the potential and positive impact.",
      criticPrompt: "You are a skeptical critic. You question assumptions and look for potential flaws or ethical concerns.",
      isPublic: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
        const response = await fetch('/api/project/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create podcast');
        }

        toast.success("Podcast scheduled successfully!");
        router.push('/'); 
    } catch (error: any) {
        toast.error(`Error: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <Card className="w-full max-w-2xl border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            Create Podcast
          </CardTitle>
          <CardDescription>
            Schedule a new AI-driven debate. Define the topic and the personalities of your agents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Title */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Podcast Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. The Future of Space Travel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                type="datetime-local" 
                                className="pl-10" 
                                {...field} 
                                min={new Date().toISOString().slice(0, 16)} // Prevent past dates in UI picker
                            />
                        </div>
                      </FormControl>
                      <FormDescription>When should the debate start?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Max 120 minutes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Privacy Toggle */}
              <div className="p-4 border rounded-lg bg-muted/20 my-6">
                <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base font-semibold">Public Podcast</FormLabel>
                                <FormDescription>
                                    Enable this to allow anyone to see and join this podcast.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
              </div>

              {/* Agents Prompts */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    Agent Personalities
                </h3>
                
                <FormField
                  control={form.control}
                  name="actorPrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Actor Agent Prompt (Supportive)</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Describe how the supporting agent should behave..." 
                            className="min-h-[100px] border-primary/20 focus:border-primary/50"
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="criticPrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary">Critic Agent Prompt (Opposing)</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Describe how the critic agent should behave..." 
                            className="min-h-[100px] border-secondary/20 focus:border-secondary/50"
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 flex gap-4">
                <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:opacity-90"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                        </>
                    ) : (
                        "Create Podcast"
                    )}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

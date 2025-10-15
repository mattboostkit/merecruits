"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, FileText, Sparkles } from "lucide-react"

export default function NewArticlePage() {
  const router = useRouter()
  const createArticle = useMutation(api.news.create)
  const teamMembers = useQuery(api.team.list)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    author: "",
    authorId: undefined as Id<"teamMembers"> | undefined,
    published: false,
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }
  }, [formData.title, formData.slug])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  // Markdown templates
  const templates = {
    standard: `## Introduction

Start your article with an engaging introduction that hooks the reader and explains what they'll learn.

## Main Section Heading

Write your main content here. Break it into digestible paragraphs to keep readers engaged.

### Subsection Heading (if needed)

Add subsections to organize complex topics. Use bullet points where appropriate:

- Key point one
- Key point two
- Key point three

## Another Major Section

Continue with more valuable content. Use **bold** for emphasis and *italics* for subtle emphasis.

> Use blockquotes to highlight important takeaways or quotes from experts.

## Conclusion

Summarize the key points and provide a clear call-to-action or next steps for your readers.`,

    howTo: `## How to [Topic]: A Step-by-Step Guide

Introduction: Briefly explain what the reader will learn and why it's important.

## Step 1: [First Step]

Explain the first step in detail. Be specific and actionable.

## Step 2: [Second Step]

Continue with the second step. Include any tips or common mistakes to avoid.

## Step 3: [Third Step]

Third step details here.

## Step 4: [Fourth Step]

Fourth step details here.

## Pro Tips

- Quick tip one
- Quick tip two
- Quick tip three

## Common Mistakes to Avoid

- Mistake 1 and how to avoid it
- Mistake 2 and how to avoid it

## Conclusion

Summarize what the reader has learned and encourage them to take action.`,

    listicle: `## Introduction

Set up why this list matters and what value it provides to readers.

## 1. [First Item Title]

Explain the first item. Include specific details, examples, or actionable advice.

## 2. [Second Item Title]

Detail about the second item goes here.

## 3. [Third Item Title]

Third item explanation.

## 4. [Fourth Item Title]

Fourth item details.

## 5. [Fifth Item Title]

Fifth item information.

## Bonus: [Extra Item]

Add a bonus tip or item for extra value.

## Final Thoughts

Wrap up the list with key takeaways and next steps.`,

    interview: `## Introduction

Brief introduction about the person being interviewed and why their insights matter.

## About [Interviewee Name]

Short bio about the interviewee - their background, experience, and current role.

## The Interview

### Q: [First Question]

**A:** Answer from the interviewee.

### Q: [Second Question]

**A:** Answer from the interviewee.

### Q: [Third Question]

**A:** Answer from the interviewee.

### Q: [Fourth Question]

**A:** Answer from the interviewee.

### Q: [Fifth Question]

**A:** Answer from the interviewee.

## Key Takeaways

- Main insight one
- Main insight two
- Main insight three

## Conclusion

Wrap up the interview with final thoughts and how readers can connect with the interviewee.`
  }

  const insertTemplate = (templateType: keyof typeof templates) => {
    setFormData({ ...formData, content: templates[templateType] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
        alert("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      // Use the slug from form data (which may be auto-generated or manually edited)
      const finalSlug = formData.slug || generateSlug(formData.title)

      await createArticle({
        title: formData.title,
        slug: finalSlug,
        excerpt: formData.excerpt,
        content: formData.content,
        imageUrl: formData.imageUrl || undefined,
        author: formData.author,
        authorId: formData.authorId,
        published: formData.published,
      })

      router.push("/admin/news")
    } catch (error) {
      console.error("Error creating article:", error)
      alert(`Failed to create article: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin/news">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-display font-bold">Add New Article</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Top 10 Interview Tips for 2025"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="top-10-interview-tips-for-2025"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-generated from title. Edit to customize the URL: /news/<span className="font-semibold">{formData.slug || "your-slug-here"}</span>
                  </p>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Select
                    value={formData.authorId}
                    onValueChange={(value) => {
                      const selectedMember = teamMembers?.find(m => m._id === value)
                      setFormData({
                        ...formData,
                        authorId: value as Id<"teamMembers">,
                        author: selectedMember?.name || ""
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers?.filter(m => m.active).map((member) => (
                        <SelectItem key={member._id} value={member._id}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold overflow-hidden">
                              {member.imageUrl ? (
                                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                member.name.split(' ').map(n => n[0]).join('')
                              )}
                            </div>
                            {member.name} - {member.role}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    The author&apos;s photo and bio will be pulled from the team section
                  </p>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt / Summary *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="A brief summary that appears in listings (1-2 sentences)"
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This short summary appears on the news listing page
                  </p>
                </div>

                {/* Content with Templates */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Article Content (Markdown) *</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertTemplate('standard')}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Standard
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertTemplate('howTo')}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        How-To
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertTemplate('listicle')}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        List
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertTemplate('interview')}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Interview
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Click a template button above to get started, or write your own Markdown..."
                    rows={20}
                    required
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground space-y-1 bg-slate-100 p-3 rounded">
                    <p className="font-semibold">Markdown Guide:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li><code className="bg-white px-1 rounded">## Heading</code> - Major section heading (H2)</li>
                      <li><code className="bg-white px-1 rounded">### Subheading</code> - Subsection heading (H3)</li>
                      <li><code className="bg-white px-1 rounded">**bold**</code> - Bold text</li>
                      <li><code className="bg-white px-1 rounded">*italic*</code> - Italic text</li>
                      <li><code className="bg-white px-1 rounded">- Item</code> - Bullet point</li>
                      <li><code className="bg-white px-1 rounded">&gt; Quote</code> - Blockquote</li>
                    </ul>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Featured Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of an image to display with your article
                  </p>
                </div>

                {/* Published */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Publish immediately (if unchecked, article will be saved as draft)
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Creating..." : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {formData.published ? "Publish Article" : "Save as Draft"}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/news">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAction, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, FileText, Target, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

export default function CVAnalysisPage() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState("")
  const [selectedJobId, setSelectedJobId] = useState<string>("")
  const [customJobTitle, setCustomJobTitle] = useState("")
  const [customJobDescription, setCustomJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [useCustomJob, setUseCustomJob] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [improvedCV, setImprovedCV] = useState<string | null>(null)
  const [isScoring, setIsScoring] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [scoreFeedback, setScoreFeedback] = useState<string | null>(null)

  const jobs = useQuery(api.jobs.list, {})
  const analyzeCVForJob = useAction(api.cvAnalysis.analyzeCVForJob)
  const generateImprovedCV = useAction(api.cvAnalysis.generateImprovedCV)
  const scoreCVQuick = useAction(api.cvAnalysis.scoreCVQuick)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCvFile(file)
    setError(null)

    try {
      let extractedText = ""

      if (file.type === "application/pdf") {
        // Handle PDF files
        const pdfjsLib = await import("pdfjs-dist")
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          const pageText = textContent.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ")
          extractedText += pageText + "\n"
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
      ) {
        // Handle DOCX files
        const mammoth = await import("mammoth")
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        extractedText = result.value
      } else if (file.type === "application/msword" || file.name.endsWith(".doc")) {
        // DOC files are tricky in browser - show helpful message
        setError("Unfortunately, .doc files cannot be processed in the browser. Please save your CV as .docx, .pdf, or .txt format.")
        return
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        // Handle text files
        const reader = new FileReader()
        reader.onload = (event) => {
          extractedText = event.target?.result as string
          setCvText(extractedText)
        }
        reader.readAsText(file)
        return
      } else {
        setError("Unsupported file type. Please upload a PDF, DOCX, or TXT file.")
        return
      }

      setCvText(extractedText)
    } catch (err) {
      console.error("File parsing error:", err)
      setError("Failed to parse file. Please try a different format or paste your CV text directly.")
    }
  }

  const handleAnalyze = async () => {
    setError(null)
    setAnalysis(null)

    // Validation
    if (!cvText) {
      setError("Please upload your CV first")
      return
    }

    if (!useCustomJob && !selectedJobId) {
      setError("Please select a job you're applying for")
      return
    }

    if (useCustomJob && (!customJobTitle || !customJobDescription)) {
      setError("Please provide both job title and description")
      return
    }

    setIsAnalyzing(true)

    try {
      let jobTitle = ""
      let jobDescription = ""

      if (useCustomJob) {
        jobTitle = customJobTitle
        jobDescription = customJobDescription
      } else {
        const selectedJob = jobs?.find((j) => j._id === selectedJobId)
        if (selectedJob) {
          jobTitle = selectedJob.title
          jobDescription = selectedJob.description
        }
      }

      const result = await analyzeCVForJob({
        cvText,
        jobTitle,
        jobDescription,
      })

      if (result.success) {
        setAnalysis(result.analysis)
      } else {
        setError(result.error || "Failed to analyze CV. Please try again.")
      }
    } catch (err) {
      console.error("Analysis error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateImprovedCV = async () => {
    setError(null)
    setImprovedCV(null)

    // Validation
    if (!cvText) {
      setError("Please upload your CV first")
      return
    }

    if (!useCustomJob && !selectedJobId) {
      setError("Please select a job you're applying for")
      return
    }

    if (useCustomJob && (!customJobTitle || !customJobDescription)) {
      setError("Please provide both job title and description")
      return
    }

    setIsGenerating(true)

    try {
      let jobTitle = ""
      let jobDescription = ""

      if (useCustomJob) {
        jobTitle = customJobTitle
        jobDescription = customJobDescription
      } else {
        const selectedJob = jobs?.find((j) => j._id === selectedJobId)
        if (selectedJob) {
          jobTitle = selectedJob.title
          jobDescription = selectedJob.description
        }
      }

      const result = await generateImprovedCV({
        cvText,
        jobTitle,
        jobDescription,
      })

      if (result.success) {
        setImprovedCV(result.improvedCV)
      } else {
        setError(result.error || "Failed to generate improved CV. Please try again.")
      }
    } catch (err) {
      console.error("Generation error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadCV = () => {
    if (!improvedCV) return

    const blob = new Blob([improvedCV], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Improved_CV.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleQuickScore = async () => {
    if (!cvText) {
      setError("Please upload your CV first")
      return
    }

    setError(null)
    setScore(null)
    setScoreFeedback(null)
    setIsScoring(true)

    try {
      const result = await scoreCVQuick({
        cvText,
      })

      if (result.success) {
        setScore(result.score)
        setScoreFeedback(result.feedback)
        // Scroll to top to show the score
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setError(result.error || "Failed to score CV. Please try again.")
      }
    } catch (err) {
      console.error("Scoring error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsScoring(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered CV Analysis
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Get expert feedback on your CV tailored to the specific job you&apos;re applying for. Powered by advanced AI and 25+ years of recruitment expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Quick Score Card */}
                {score !== null && scoreFeedback && (
                  <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          Your CV Score
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="text-5xl font-bold text-primary">{score}</div>
                          <div className="text-2xl font-semibold text-muted-foreground">/10</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                        {scoreFeedback}
                      </pre>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Step 1: Upload Your CV
                    </CardTitle>
                    <CardDescription>
                      Upload your CV as PDF, DOCX, or TXT, or paste it below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cv-upload">Upload CV File</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".txt,.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        {cvFile && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Accepts PDF, DOCX, or TXT files
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cv-text">Or Paste CV Text</Label>
                      <Textarea
                        id="cv-text"
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        placeholder="Paste your CV text here..."
                        rows={12}
                        className="font-mono text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Step 2: Select Target Job
                    </CardTitle>
                    <CardDescription>
                      Choose the job you&apos;re applying for
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="custom-job"
                        checked={useCustomJob}
                        onChange={(e) => setUseCustomJob(e.target.checked)}
                        className="cursor-pointer"
                      />
                      <label htmlFor="custom-job" className="text-sm cursor-pointer">
                        Enter custom job details (not from our listings)
                      </label>
                    </div>

                    {!useCustomJob ? (
                      <div className="space-y-2">
                        <Label htmlFor="job-select">Select from our current vacancies</Label>
                        <Select onValueChange={setSelectedJobId} value={selectedJobId}>
                          <SelectTrigger id="job-select">
                            <SelectValue placeholder="Choose a job..." />
                          </SelectTrigger>
                          <SelectContent>
                            {jobs === undefined ? (
                              <SelectItem value="loading" disabled>
                                Loading jobs...
                              </SelectItem>
                            ) : jobs.length > 0 ? (
                              jobs.map((job) => (
                                <SelectItem key={job._id} value={job._id}>
                                  {job.title} - {job.location}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-jobs" disabled>
                                No jobs available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="custom-title">Job Title</Label>
                          <Input
                            id="custom-title"
                            value={customJobTitle}
                            onChange={(e) => setCustomJobTitle(e.target.value)}
                            placeholder="e.g., Marketing Manager"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="custom-description">Job Description</Label>
                          <Textarea
                            id="custom-description"
                            value={customJobDescription}
                            onChange={(e) => setCustomJobDescription(e.target.value)}
                            placeholder="Paste the full job description here..."
                            rows={8}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button
                    onClick={handleQuickScore}
                    disabled={isScoring || isAnalyzing || isGenerating || !cvText}
                    size="lg"
                    variant="default"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    {isScoring ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                        Scoring Your CV...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Score My CV (Out of 10)
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || isGenerating || isScoring || !cvText}
                    size="lg"
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                        Analyzing Your CV...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-5 w-5" />
                        Get AI-Powered Feedback
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleGenerateImprovedCV}
                    disabled={isAnalyzing || isGenerating || isScoring || !cvText}
                    size="lg"
                    variant="secondary"
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                        Generating Improved CV...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Make AI-Powered Changes
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Card className="border-destructive bg-destructive/10">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Error</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Analysis & Recommendations
                    </CardTitle>
                    <CardDescription>
                      Expert feedback tailored to your target role
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!analysis && !isAnalyzing ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                          <Lightbulb className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground mb-2">
                          Upload your CV and select a job to get started
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Our AI will analyze your CV and provide specific recommendations to improve your chances of securing an interview.
                        </p>
                      </div>
                    ) : isAnalyzing ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                        <p className="text-muted-foreground mb-2 font-semibold">
                          Analyzing your CV...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This may take 10-20 seconds
                        </p>
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
                            ),
                            h2: ({ children }) => (
                              <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
                            ),
                            p: ({ children }) => (
                              <p className="mb-3 leading-relaxed">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>
                            ),
                            li: ({ children }) => (
                              <li className="leading-relaxed">{children}</li>
                            ),
                          }}
                        >
                          {analysis}
                        </ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Improved CV Section */}
                {improvedCV && (
                  <Card className="border-2 border-primary/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Your Improved CV
                          </CardTitle>
                          <CardDescription>
                            Tailored specifically for your target role
                          </CardDescription>
                        </div>
                        <Button onClick={handleDownloadCV} variant="outline" size="sm">
                          Download CV
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-50 p-6 rounded-lg">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {improvedCV}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 mx-auto text-xl font-bold">
                    1
                  </div>
                  <CardTitle className="text-center text-lg">Upload Your CV</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Upload your CV as PDF, DOCX, or TXT, or paste it directly into the form
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 mx-auto text-xl font-bold">
                    2
                  </div>
                  <CardTitle className="text-center text-lg">Select Target Job</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Choose from our current vacancies or enter details for any job you&apos;re applying for
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 mx-auto text-xl font-bold">
                    3
                  </div>
                  <CardTitle className="text-center text-lg">Get Expert Feedback</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Receive detailed, actionable recommendations to improve your CV for that specific role
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

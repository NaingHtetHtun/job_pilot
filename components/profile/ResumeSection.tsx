"use client"

import { UploadIcon } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import { uploadResume } from "@/actions/profile"

type Props = {
  existingResumeUrl?: string | null
  onExtracted?: (data: Record<string, unknown>) => void
}

export function ResumeSection({ existingResumeUrl, onExtracted }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [isUploading, startUploading] = useTransition()
  const [isExtracting, startExtracting] = useTransition()
  const [extractError, setExtractError] = useState<string | null>(null)
  const [isGenerating, startGenerating] = useTransition()
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [generateSuccess, setGenerateSuccess] = useState(false)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
      setUploadError(null)
      setUploadSuccess(false)
    } else {
      setUploadError("Only PDF files are accepted")
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadError(null)
      setUploadSuccess(false)
    }
  }

  function handleUpload() {
    if (!selectedFile) return
    setUploadError(null)
    setUploadSuccess(false)

    startUploading(async () => {
      const formData = new FormData()
      formData.append("resume", selectedFile)
      try {
        await uploadResume(formData)
        setUploadSuccess(true)
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed")
      }
    })
  }

  function handleExtract() {
    if (!existingResumeUrl) return
    startExtracting(async () => {
      setExtractError(null)
      try {
        const res = await fetch("/api/resume/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
        const { data, error } = await res.json()
        if (error) throw new Error(error)
        onExtracted?.(data)
      } catch (err) {
        setExtractError(err instanceof Error ? err.message : "Extraction failed")
      }
    })
  }

  function handleGenerate() {
    startGenerating(async () => {
      setGenerateError(null)
      setGenerateSuccess(false)
      try {
        const res = await fetch("/api/resume/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
        const { error, url } = await res.json()
        if (error) throw new Error(error)
        window.open(url, "_blank")
        setGenerateSuccess(true)
      } catch (err) {
        setGenerateError(err instanceof Error ? err.message : "Generation failed")
      }
    })
  }

  const hasResume = !!existingResumeUrl || !!selectedFile

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="text-base font-semibold text-text-primary">Resume</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-4 cursor-pointer rounded-xl border-2 border-dashed py-10 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent-muted"
            : "border-border bg-surface-secondary"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-card">
          <UploadIcon className="h-5 w-5 text-text-muted" />
        </div>
        <p className="mt-3 text-sm font-medium text-text-primary">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-xs text-text-muted">PDF only (max 5MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {selectedFile && !uploadSuccess && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border p-3">
          <span className="text-sm text-text-primary">{selectedFile.name}</span>
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      )}

      {uploadError && (
        <p className="mt-2 text-xs text-error">{uploadError}</p>
      )}

      {uploadSuccess && (
        <p className="mt-2 text-xs text-success">Resume uploaded successfully</p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {hasResume && (
          <>
            <button
              type="button"
              onClick={handleExtract}
              disabled={isExtracting}
              className="min-h-10 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:opacity-60"
            >
              {isExtracting ? "Extracting..." : "Extract Profile"}
            </button>
            {extractError && (
              <p className="text-xs text-error">{extractError}</p>
            )}
          </>
        )}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="min-h-10 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isGenerating ? "Generating..." : "Generate Resume from Profile"}
        </button>
        {generateError && (
          <p className="text-xs text-error">{generateError}</p>
        )}
        {generateSuccess && (
          <p className="text-xs text-success">Resume generated! Check your downloads.</p>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Search } from "lucide-react"

export default function AdminTeamPage() {
  const { tenantId } = useTenant()
  const [searchTerm, setSearchTerm] = useState("")
  const teamMembers = useQuery(api.team.list, { tenantId })

  const filteredTeamMembers = teamMembers?.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="/admin">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-display font-bold">Team Management</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Team Members</CardTitle>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!teamMembers ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading team members...</p>
                </div>
              ) : filteredTeamMembers && filteredTeamMembers.length > 0 ? (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeamMembers.map((member) => (
                        <TableRow key={member._id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.order}</TableCell>
                          <TableCell>
                            {member.active ? (
                              <span className="text-green-600 font-medium">Active</span>
                            ) : (
                              <span className="text-muted-foreground">Inactive</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No team members found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

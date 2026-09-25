"use client";

import * as React from "react";
import {
  UserCheck,
  Search,
  Shield,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
} from "lucide-react";
import { AdminUserAccount } from "@/types";
import { adminService } from "@/services/adminService";

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<AdminUserAccount[]>(() => {
    try {
      return adminService.getUsers();
    } catch {
      return [];
    }
  });
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<"all" | "admin" | "user">("all");
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleRoleChange = (id: string, name: string, newRole: "user" | "admin") => {
    const success = adminService.updateUserRole(id, newRole);
    if (success) {
      setUsers(adminService.getUsers());
      setNotification({
        type: "success",
        text: `Updated role for ${name} to "${newRole.toUpperCase()}".`,
      });
    } else {
      setNotification({
        type: "error",
        text: "Action prohibited: Cannot demote the last remaining root administrator.",
      });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-clash text-[#F1F5F9] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <span>User Accounts & Permissions ({users.length})</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Audit registered accounts, verification status, and administrator privileges.
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
            notification.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email address..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Users" },
            { id: "admin", label: "Admins Only" },
            { id: "user", label: "Standard Users" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRoleFilter(item.id as "all" | "admin" | "user")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                roleFilter === item.id
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#262B35]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E232B] bg-[#0F1217] text-[11px] font-mono uppercase text-[#64748B]">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Email Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Role Escalation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#94A3B8]">
                    No accounts found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const fullName = `${u.firstName} ${u.lastName}`.trim();
                  return (
                    <tr key={u.id} className="hover:bg-[#161A22] transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              u.role === "admin"
                                ? "bg-amber-500 text-black shadow-sm"
                                : "bg-[#1E232B] text-[#CBD5E1]"
                            }`}
                          >
                            {u.role === "admin" ? (
                              <Shield className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-[#F1F5F9]">{fullName}</p>
                            <p className="text-[10px] font-mono text-[#64748B]">{u.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#CBD5E1]">
                        {u.email}
                      </td>

                      {/* Verification Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {u.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Unverified</span>
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-[#94A3B8]">
                        {new Date(u.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Last Activity */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-[#64748B]">
                        {u.lastLoginAt
                          ? new Date(u.lastLoginAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Never"}
                      </td>

                      {/* Role Escalation Dropdown */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, fullName, e.target.value as "user" | "admin")
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition border outline-none ${
                            u.role === "admin"
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                              : "bg-[#14181F] text-[#94A3B8] border-[#262B35] hover:border-[#3B4252]"
                          }`}
                        >
                          <option value="user" className="bg-[#12151B] text-[#F1F5F9]">
                            User
                          </option>
                          <option value="admin" className="bg-[#12151B] text-amber-400 font-bold">
                            Admin
                          </option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Policy Notice */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex items-start gap-3 text-xs text-[#94A3B8]">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#F1F5F9]">Role Escalation Security Policy</p>
          <p>
            Users assigned the <code className="text-amber-400">Admin</code> role acquire unrestricted access to base layout links, commission status updates, support inbox communications, and newsletter subscriber exports. At least one root administrator account is persistently preserved by the system.
          </p>
        </div>
      </div>
    </div>
  );
}

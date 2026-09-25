"use client";

import * as React from "react";
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Send,
  CornerDownRight,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { ContactMessage } from "@/types";
import { adminService } from "@/services/adminService";

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<ContactMessage[]>(() => {
    try {
      return adminService.getMessages();
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = React.useState<"all" | "unread" | "replied">("all");
  const [search, setSearch] = React.useState("");
  const [selectedMessage, setSelectedMessage] = React.useState<ContactMessage | null>(() => {
    try {
      const all = adminService.getMessages();
      return all[0] || null;
    } catch {
      return null;
    }
  });
  const [replyText, setReplyText] = React.useState("");
  const [notification, setNotification] = React.useState<string | null>(null);

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setReplyText("");
    if (!msg.isRead) {
      adminService.markMessageRead(msg.id, true);
      setMessages(adminService.getMessages());
    }
  };

  const handleToggleRead = (id: string, currentRead: boolean) => {
    adminService.markMessageRead(id, !currentRead);
    const updated = adminService.getMessages();
    setMessages(updated);
    if (selectedMessage?.id === id) {
      setSelectedMessage(updated.find((m) => m.id === id) || null);
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      adminService.deleteMessage(id);
      const updated = adminService.getMessages();
      setMessages(updated);
      setSelectedMessage(updated[0] || null);
      setNotification("Message deleted.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;

    adminService.replyToMessage(selectedMessage.id, replyText.trim());
    const updated = adminService.getMessages();
    setMessages(updated);
    setSelectedMessage(updated.find((m) => m.id === selectedMessage.id) || null);
    setReplyText("");
    setNotification(`Reply dispatched to ${selectedMessage.email}.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !m.isRead) ||
      (filter === "replied" && Boolean(m.repliedAt));

    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-clash text-[#F1F5F9] flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <span>Support Messages ({messages.length})</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Customer inquiries, clan sponsorships, and support tickets submitted through the contact form.
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or subject..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: "all", label: "All Messages" },
            { id: "unread", label: "Unread" },
            { id: "replied", label: "Replied" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as "all" | "unread" | "replied")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                filter === item.id
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#262B35]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Pane View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List (5 columns) */}
        <div className="lg:col-span-5 rounded-xl border border-[#1E232B] bg-[#12151B] overflow-hidden shadow-lg flex flex-col max-h-[700px]">
          <div className="p-3 border-b border-[#1E232B] bg-[#0F1217] text-xs font-semibold text-[#94A3B8] flex items-center justify-between">
            <span>Conversations</span>
            <span className="font-mono text-[11px]">{filteredMessages.length} items</span>
          </div>

          <div className="overflow-y-auto divide-y divide-[#1E232B]">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#64748B]">
                No messages match the current filter.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-[#1A1F29] border-l-4 border-amber-500"
                        : "hover:bg-[#161A22]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-[#F1F5F9] truncate">
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#CBD5E1] truncate">
                      {msg.subject}
                    </p>

                    <p className="text-[11px] text-[#64748B] line-clamp-1">
                      {msg.message}
                    </p>

                    {msg.repliedAt && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5">
                        <CornerDownRight className="w-3 h-3" /> Replied
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Message Detail & Reply Composer (7 columns) */}
        <div className="lg:col-span-7 rounded-xl border border-[#1E232B] bg-[#12151B] p-6 shadow-lg flex flex-col justify-between min-h-[500px]">
          {selectedMessage ? (
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Header Info */}
              <div className="flex items-start justify-between pb-4 border-b border-[#1E232B] gap-4">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-bold text-[#F1F5F9]">
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="font-semibold text-[#CBD5E1]">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">
                      {new Date(selectedMessage.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.isRead)}
                    className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-[#F1F5F9] transition"
                    title={selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {selectedMessage.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-red-400 transition"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl border border-[#1E232B] bg-[#0F1217] text-xs text-[#CBD5E1] leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Existing Reply Display */}
              {selectedMessage.replyText && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dispatched Reply</span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      ({new Date(selectedMessage.repliedAt || "").toLocaleDateString()})
                    </span>
                  </div>
                  <p className="text-xs text-[#CBD5E1] whitespace-pre-wrap">
                    {selectedMessage.replyText}
                  </p>
                </div>
              )}

              {/* Reply Composer */}
              <form onSubmit={handleSendReply} className="mt-auto pt-4 border-t border-[#1E232B] space-y-3">
                <label className="text-xs font-semibold text-[#F1F5F9] flex items-center gap-1.5">
                  <CornerDownRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Response to {selectedMessage.name}</span>
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write your professional reply to ${selectedMessage.email}...`}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Sent via OPICOC Outbound Mail Service
                  </span>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black shadow-lg shadow-amber-500/10 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Reply</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#64748B]">
              Select a message to view details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

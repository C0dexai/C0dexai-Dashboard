
import React from 'react';

export interface Model {
  id: string;
  name: string;
  version: string;
  status: 'Active' | 'In-Training' | 'Inactive';
  usage: number;
  avgResponse: number;
  description: string;
}

export interface Conversation {
  id: string;
  user: string;
  model: string;
  topic: string;
  timestamp: string;
  status: 'Active' | 'Closed' | 'Pending';
}

export interface Topic {
  name: string;
  percentage: number;
  color: string;
  class: string;
}

export interface ConsoleMessage {
    source: 'user' | 'ai' | 'system';
    content: React.ReactNode;
}

export interface Domain {
  id: string;
  name: string;
  agent: Agent;
}

export interface Agent {
  name: string;
  status: 'Online' | 'Syncing' | 'Offline';
  lastSync: string;
  contextLedgerSize: number; // in KB
}

export interface SynchronizedDocument {
  id: string;
  name: string;
  version: string;
  status: 'Synced' | 'Pending Review' | 'Conflict' | 'Syncing';
  lastSynced: string;
  sourceDomain: 'Domain A' | 'Domain B';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  agent: string;
  message: string;
}

// New types for Repository Page
export type RepoNode = File | Folder;

export interface File {
  type: 'file';
  name: string;
  path: string;
  content: string;
}

export interface Folder {
  type: 'folder';
  name: string;
  path: string;
  children: RepoNode[];
}

export interface AgentCommand {
    name: string;
    command: string;
    description: string;
    target: 'container' | 'AI' | 'system' | 'shell' | 'AI Family';
}

export interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    structure: Folder;
}

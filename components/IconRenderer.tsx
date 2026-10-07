import React from 'react';
import {
  Minimize2, RefreshCw, Scissors, Maximize2, Crop, Stamp, FileCode2,
  Palette, ShieldCheck, Sliders, Smile, Film, QrCode, Bookmark,
  Binary, Layers, Split, FileArchive, Image, FileImage, Lock,
  Unlock, RotateCw, ArrowUpDown, FileText, BadgeAlert, FolderKanban,
  ListOrdered, FileEdit, BookOpen, Award, Code2, Terminal, FileCode,
  Key, Type, Baseline, GitCompare, Link, Braces, KeyRound,
  AlignLeft, Fingerprint, Database, Code, Pipette, Compass, Clock,
  Hash, Wrench, LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Minimize2,
  RefreshCw,
  Scissors,
  Maximize2,
  Crop,
  Stamp,
  FileCode2,
  Palette,
  ShieldCheck,
  Sliders,
  Smile,
  Film,
  QrCode,
  Bookmark,
  Binary,
  Layers,
  Split,
  FileArchive,
  Image,
  FileImage,
  Lock,
  Unlock,
  RotateCw,
  ArrowUpDown,
  FileText,
  BadgeAlert,
  FolderKanban,
  ListOrdered,
  FileEdit,
  BookOpen,
  Award,
  Code2,
  Terminal,
  FileCode,
  Key,
  Type,
  Baseline,
  GitCompare,
  Link,
  Braces,
  KeyRound,
  AlignLeft,
  Fingerprint,
  Database,
  Code,
  Pipette,
  Compass,
  Clock,
  Hash,
  Wrench
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  const Component = ICON_MAP[name] || Wrench;
  return <Component className={className} size={size} />;
};


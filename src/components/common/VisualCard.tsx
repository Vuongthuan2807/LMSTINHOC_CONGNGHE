import React from 'react';
import {
  Monitor,
  Cpu,
  Mouse,
  Keyboard,
  ShieldCheck,
  Zap,
  Wrench,
  Bot,
  Globe,
  Battery,
  Lightbulb,
} from 'lucide-react';

interface VisualCardProps {
  type?: 'computer' | 'mouse' | 'keyboard' | 'monitor' | 'internet' | 'safety' | 'tool' | 'circuit' | 'robot';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VisualCard: React.FC<VisualCardProps> = ({ type = 'computer', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
  };

  const getVisual = () => {
    switch (type) {
      case 'monitor':
        return (
          <div className="relative flex flex-col items-center justify-center p-3 bg-gradient-to-b from-sky-400 to-sky-600 rounded-2xl shadow-inner text-white">
            <Monitor className="w-10 h-10 drop-shadow-md" />
            <div className="w-4 h-1.5 bg-sky-800 rounded-xs mt-1"></div>
            <div className="w-8 h-1 bg-sky-900 rounded-full mt-0.5"></div>
          </div>
        );
      case 'computer':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-inner text-white">
            <Cpu className="w-10 h-10 animate-spin-slow" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-300"></div>
          </div>
        );
      case 'mouse':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl shadow-inner text-white">
            <Mouse className="w-10 h-10" />
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/40 rounded-full"></div>
          </div>
        );
      case 'keyboard':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-teal-400 to-emerald-600 rounded-2xl shadow-inner text-white">
            <Keyboard className="w-10 h-10" />
          </div>
        );
      case 'safety':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-2xl shadow-inner text-white">
            <ShieldCheck className="w-10 h-10" />
          </div>
        );
      case 'circuit':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl shadow-inner text-white">
            <Battery className="w-9 h-9" />
            <Zap className="w-5 h-5 absolute -top-1 -right-1 text-yellow-200 fill-yellow-200" />
          </div>
        );
      case 'robot':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl shadow-inner text-white">
            <Bot className="w-10 h-10" />
          </div>
        );
      case 'tool':
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-emerald-500 to-teal-700 rounded-2xl shadow-inner text-white">
            <Wrench className="w-9 h-9" />
          </div>
        );
      case 'internet':
      default:
        return (
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl shadow-inner text-white">
            <Globe className="w-10 h-10" />
            <Lightbulb className="w-4 h-4 absolute top-1 right-1 text-amber-300" />
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {getVisual()}
    </div>
  );
};

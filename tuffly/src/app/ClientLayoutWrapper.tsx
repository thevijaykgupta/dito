'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import FloatingActionButton from '@/components/FloatingActionButton';
import NotificationSystem from '@/components/NotificationSystem';
import AnimatedBackground from '@/components/AnimatedBackground';
import BottomNav from '@/components/BottomNav';
import SuggestionsBoard from '@/components/SuggestionsBoard';
import ThemeClient from './ThemeClient';
import EmotionSelector from '@/components/EmotionSelector';
import { featureFlags } from '@/shared/config/featureFlags';

const FeedbackSystem = dynamic(() => import('@/components/FeedbackSystem'), { ssr: false, loading: () => <div className="hidden" /> });
const StudyMaterialZone = dynamic(() => import('@/components/StudyMaterialZone'), { ssr: false, loading: () => <div className="hidden" /> });
const AchievementSystem = dynamic(() => import('@/components/AchievementSystem'), { ssr: false, loading: () => <div className="hidden" /> });
const MicroJobsBoard = dynamic(() => import('@/components/MicroJobsBoard'), { ssr: false, loading: () => <div className="hidden" /> });
const TutoringSystem = dynamic(() => import('@/components/TutoringSystem'), { ssr: false });
const CommissionSystem = dynamic(() => import('@/components/CommissionSystem'), { ssr: false });
const ConfessionBoard = dynamic(() => import('@/components/ConfessionBoard'), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      <ThemeClient>
        <EmotionSelector />
        <Navbar />
        <NotificationSystem />
        <FloatingActionButton />
        {featureFlags.enableFloatingPopups ? <MicroJobsBoard /> : null}
        {featureFlags.enableFloatingPopups ? <TutoringSystem /> : null}
        {featureFlags.enableFloatingPopups ? <CommissionSystem /> : null}
        {featureFlags.showConfessionBanner ? <ConfessionBoard /> : null}
        {featureFlags.enableFloatingPopups ? <StudyMaterialZone /> : null}
        <main className="min-h-screen pt-16 pb-16 bg-gradient-to-br from-yellow-50 via-blue-50 to-white/80">
          {children}
        </main>
        <BottomNav />
        {featureFlags.enableFeedbackSystem ? <FeedbackSystem /> : null}
        {featureFlags.enableAchievementSystem ? <AchievementSystem /> : null}
        {featureFlags.enableSuggestionsBoard ? <SuggestionsBoard /> : null}
      </ThemeClient>
    </>
  );
} 
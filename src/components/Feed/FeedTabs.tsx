'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FeedTabsProps {
  activeTab: 'fyp' | 'friends' | 'trending'
  onTabChange: (tab: 'fyp' | 'friends' | 'trending') => void
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="px-4 pb-2">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fyp" className="text-xs">
            For You
          </TabsTrigger>
          <TabsTrigger value="friends" className="text-xs">
            Friends
          </TabsTrigger>
          <TabsTrigger value="trending" className="text-xs">
            Trending
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
} 
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface MaintenanceState {
  isMaintenanceMode: boolean
  maintenanceMessage: string
  estimatedDowntime: string
  lastUpdate: Date
}

interface MaintenanceContextType {
  maintenanceState: MaintenanceState
  setMaintenanceMode: (enabled: boolean, message?: string) => void
  updateMaintenanceMessage: (message: string) => void
  isSystemHealthy: boolean
  systemStatus: 'operational' | 'degraded' | 'maintenance' | 'down'
  isConfessionBoardEnabled: boolean
  setConfessionBoardEnabled: (enabled: boolean) => void
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined)

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [maintenanceState, setMaintenanceState] = useState<MaintenanceState>({
    isMaintenanceMode: false,
    maintenanceMessage: '',
    estimatedDowntime: '',
    lastUpdate: new Date(),
  })

  const [isSystemHealthy, setIsSystemHealthy] = useState(true)
  const [systemStatus, setSystemStatus] = useState<'operational' | 'degraded' | 'maintenance' | 'down'>('operational')

  const [isConfessionBoardEnabled, setConfessionBoardEnabled] = useState(true)

  useEffect(() => {
    // Simulate system health check
    const healthCheck = () => {
      const isHealthy = Math.random() > 0.1 // 90% uptime simulation
      setIsSystemHealthy(isHealthy)
      
      if (!isHealthy) {
        setSystemStatus('degraded')
      } else if (maintenanceState.isMaintenanceMode) {
        setSystemStatus('maintenance')
      } else {
        setSystemStatus('operational')
      }
    }

    const interval = setInterval(healthCheck, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [maintenanceState.isMaintenanceMode])

  const setMaintenanceMode = (enabled: boolean, message: string = '') => {
    setMaintenanceState(prev => ({
      ...prev,
      isMaintenanceMode: enabled,
      maintenanceMessage: message,
      estimatedDowntime: enabled ? '30 minutes' : '',
      lastUpdate: new Date(),
    }))
  }

  const updateMaintenanceMessage = (message: string) => {
    setMaintenanceState(prev => ({
      ...prev,
      maintenanceMessage: message,
      lastUpdate: new Date(),
    }))
  }

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceState,
        setMaintenanceMode,
        updateMaintenanceMessage,
        isSystemHealthy,
        systemStatus,
        isConfessionBoardEnabled,
        setConfessionBoardEnabled,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  )
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext)
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider')
  }
  return context
} 

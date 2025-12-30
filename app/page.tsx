'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

// Types
interface CWVData {
  date: Date
  url: string
  type: string
  device: string
  ttfb: number
  lcp: number
  lcp_status: string
  inp: number
  inp_status: string
  cls: number
  cls_status: string
  overall: string
}

interface MetricCardProps {
  title: string
  value: string | number
  status: string
  trend?: string
}

// Metric Card Component
function MetricCard({ title, value, status, trend }: MetricCardProps) {
  const getStatusColor = (status: string) => {
    if (status === 'FAST') return 'bg-success text-white'
    if (status === 'AVERAGE') return 'bg-warning text-gray-900'
    if (status === 'SLOW') return 'bg-danger text-white'
    return 'bg-gray-100 text-gray-900'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && <p className="text-sm text-gray-500 mt-1">{trend}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const [data, setData] = useState<CWVData[]>([])
  const [selectedDevice, setSelectedDevice] = useState<'Mobile' | 'Desktop'>('Mobile')
  const [selectedUrl, setSelectedUrl] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from Google Sheets API
    // For now, using mock data
    const mockData: CWVData[] = [
      {
        date: new Date('2024-12-28'),
        url: 'https://www.vinci-immobilier.com/',
        type: 'Origine',
        device: 'Mobile',
        ttfb: 164,
        lcp: 3284,
        lcp_status: 'AVERAGE',
        inp: 235,
        inp_status: 'AVERAGE',
        cls: 0.380,
        cls_status: 'SLOW',
        overall: 'SLOW'
      },
      {
        date: new Date('2024-12-29'),
        url: 'https://www.vinci-immobilier.com/',
        type: 'Origine',
        device: 'Mobile',
        ttfb: 160,
        lcp: 3200,
        lcp_status: 'AVERAGE',
        inp: 230,
        inp_status: 'AVERAGE',
        cls: 0.350,
        cls_status: 'SLOW',
        overall: 'SLOW'
      },
      {
        date: new Date('2024-12-30'),
        url: 'https://www.vinci-immobilier.com/',
        type: 'Origine',
        device: 'Mobile',
        ttfb: 155,
        lcp: 3100,
        lcp_status: 'AVERAGE',
        inp: 225,
        inp_status: 'AVERAGE',
        cls: 0.320,
        cls_status: 'SLOW',
        overall: 'AVERAGE'
      },
    ]
    
    setData(mockData)
    setLoading(false)
  }, [])

  // Filter data based on selection
  const filteredData = data
    .filter(d => d.device === selectedDevice)
    .filter(d => selectedUrl === 'all' || d.url === selectedUrl)
    .filter(d => d.type === 'Origine')

  // Get unique URLs
  const urls = Array.from(new Set(data.map(d => d.url)))

  // Calculate latest metrics
  const latestMetrics = filteredData.length > 0 ? filteredData[filteredData.length - 1] : null

  // Prepare chart data
  const chartData = filteredData.map(d => ({
    date: format(d.date, 'dd/MM'),
    LCP: d.lcp,
    INP: d.inp,
    CLS: Math.round(d.cls * 1000), // Convert to scale
    TTFB: d.ttfb
  }))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Perf Tracker</h1>
              <p className="text-gray-600 mt-2">by <span className="font-semibold text-primary">OJ Consulting</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {latestMetrics ? format(latestMetrics.date, 'dd/MM/yyyy HH:mm') : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 items-center flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDevice('Mobile')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDevice === 'Mobile'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mobile
                </button>
                <button
                  onClick={() => setSelectedDevice('Desktop')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDevice === 'Desktop'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Desktop
                </button>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <select
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All URLs</option>
                {urls.map(url => (
                  <option key={url} value={url}>{url}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        {latestMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="LCP (Largest Contentful Paint)"
              value={`${latestMetrics.lcp} ms`}
              status={latestMetrics.lcp_status}
              trend="Target: < 2.5s"
            />
            <MetricCard
              title="INP (Interaction to Next Paint)"
              value={`${latestMetrics.inp} ms`}
              status={latestMetrics.inp_status}
              trend="Target: < 200ms"
            />
            <MetricCard
              title="CLS (Cumulative Layout Shift)"
              value={latestMetrics.cls.toFixed(3)}
              status={latestMetrics.cls_status}
              trend="Target: < 0.1"
            />
            <MetricCard
              title="TTFB (Time to First Byte)"
              value={`${latestMetrics.ttfb} ms`}
              status={latestMetrics.ttfb < 200 ? 'FAST' : latestMetrics.ttfb < 600 ? 'AVERAGE' : 'SLOW'}
              trend="Target: < 200ms"
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* LCP Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">LCP Evolution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="LCP" stroke="#34a853" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* INP Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">INP Evolution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="INP" stroke="#fbbc04" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* CLS Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CLS Evolution (×1000)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="CLS" stroke="#ea4335" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* TTFB Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">TTFB Evolution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="TTFB" stroke="#1a73e8" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-8">
          <p>Powered by <span className="font-semibold text-primary">OJ Consulting</span></p>
          <p className="mt-1">Data from PageSpeed Insights API • Core Web Vitals Monitoring</p>
        </div>
      </div>
    </main>
  )
}

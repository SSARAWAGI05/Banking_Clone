import React, { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  Copy,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  QrCode,
  User,
  LogOut,
  Download,
  Smartphone,
  CreditCard as Card,
  PiggyBank,
  FileText,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { supabase } from '../supabaseClient'

// ✅ Type of your row in Supabase table
type BalanceRow = {
  bal: number
}

interface DashboardProps {
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // ✅ Live balance state
  const [balance, setBalance] = useState<number | null>(null)

  // ✅ Fetch balance from Supabase on mount
  useEffect(() => {
    const fetchBalance = async () => {
      const { data, error } = await supabase
        .from('balance') // your table
        .select('bal')   // your column
        .single<BalanceRow>() // tell TS type

      if (error) {
        console.error('Error fetching balance:', error)
      } else if (data) {
        setBalance(data.bal)
      }
    }

    fetchBalance()
  }, [])

  // ✅ Real-time updates if row changes
  useEffect(() => {
    const channel = supabase
      .channel('balance-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'balance' },
        (payload) => {
          // @ts-ignore because payload.new is dynamic
          if (payload.new && payload.new.bal !== undefined) {
            // @ts-ignore
            setBalance(payload.new.bal)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    })

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Kotak 811</h1>
            <p className="text-xs text-gray-600">Digital Banking</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
        >
          <LogOut className="w-5 h-5 mr-1" />
          Logout
        </button>
      </header>

      {/* Balance Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-red-100 text-sm">Welcome back,</p>
            <h2 className="text-xl font-bold">User</h2>
          </div>
          <User className="w-10 h-10 text-red-200" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-100 text-sm">Account Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-red-200 hover:text-white"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-3xl font-bold">
            {balance === null
              ? 'Loading...'
              : showBalance
              ? formatCurrency(balance)
              : '••••••'}
          </p>
          <p className="text-red-100 text-sm">Savings Account</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex">
          {[
            { key: 'overview', label: 'Overview', icon: Wallet },
            { key: 'details', label: 'Details', icon: CreditCard },
            { key: 'qr', label: 'QR Code', icon: QrCode },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl m-1 transition-colors ${
                activeTab === key
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors">
                <ArrowUpRight className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Send Money</span>
              </button>
              <button className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition-colors">
                <ArrowDownRight className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Request Money</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Tab */}
      {activeTab === 'qr' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">QR Code</h3>
          <div className="text-center space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
              <img
                src="/QR.png"
                alt="Payment QR Code"
                className="w-48 h-48 mx-auto rounded-xl border border-gray-200 object-contain bg-white"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">Scan to Pay</p>
              <p className="text-sm text-gray-600">UPI ID: example@upi</p>
              <button
                onClick={() => navigator.clipboard.writeText('example@upi')}
                className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy UPI ID
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
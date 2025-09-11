import React, { useState } from 'react';
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
  HelpCircle
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const accountDetails = {
    accountNumber: '8348191831',
    ifscCode: 'KKBK0006590',
    upiId: '9163615663@kotak811',
    balance: 85158,
    accountHolder: 'Shubam Sarawagi',
    accountType: 'Savings Account'
  };

  const bankingServices = [
    { icon: Smartphone, title: 'Mobile Recharge', description: 'Recharge your mobile instantly', color: 'bg-blue-50 text-blue-600' },
    { icon: Card, title: 'Bill Payments', description: 'Pay utility bills easily', color: 'bg-green-50 text-green-600' },
    { icon: PiggyBank, title: 'Fixed Deposits', description: 'Invest in FDs online', color: 'bg-purple-50 text-purple-600' },
    { icon: FileText, title: 'Statements', description: 'Download account statements', color: 'bg-orange-50 text-orange-600' },
    { icon: Settings, title: 'Account Settings', description: 'Manage your account', color: 'bg-gray-50 text-gray-600' },
    { icon: HelpCircle, title: 'Customer Support', description: '24/7 help & support', color: 'bg-red-50 text-red-600' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Kotak 811</h1>
                <p className="text-xs text-gray-600">Digital Banking</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-red-100 text-sm">Welcome back,</p>
              <h2 className="text-xl font-bold">{accountDetails.accountHolder}</h2>
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
              {showBalance ? formatCurrency(accountDetails.balance) : '••••••'}
            </p>
            <p className="text-red-100 text-sm">{accountDetails.accountType}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex">
            {[
              { key: 'overview', label: 'Overview', icon: Wallet },
              { key: 'details', label: 'Details', icon: CreditCard },
              { key: 'qr', label: 'QR Code', icon: QrCode }
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

        {/* Overview Tab */}
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

            {/* Banking Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Banking Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {bankingServices.map((service, index) => (
                  <button
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${service.color}`}>
                      <service.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{service.title}</h4>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
            <div className="space-y-4">
              {[
                { label: 'Account Number', value: accountDetails.accountNumber },
                { label: 'IFSC Code', value: accountDetails.ifscCode },
                { label: 'UPI ID', value: accountDetails.upiId },
                { label: 'Account Holder', value: accountDetails.accountHolder },
                { label: 'Account Type', value: accountDetails.accountType }
              ].map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{detail.label}</p>
                    <p className="text-sm text-gray-600 font-mono">{detail.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(detail.value)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Download Statement
            </button>
          </div>
        )}

        {/* QR Code Tab */}
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
                <p className="text-sm text-gray-600">UPI ID: {accountDetails.upiId}</p>
                <button
                  onClick={() => copyToClipboard(accountDetails.upiId)}
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500 text-center">
            Kotak Mahindra Bank • Secure Banking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
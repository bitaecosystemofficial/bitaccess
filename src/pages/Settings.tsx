
import React from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { useWallet } from "@/contexts/WalletContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Bell, Shield, Network } from "lucide-react";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { networkInfo } from "@/constants/contracts";

const SettingsPage = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Settings Access Required"
          description="Please connect your wallet to access settings"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Account Settings"
            subtitle="Configure your account preferences and notifications"
            centered
          />
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-6">
                <Card className="border-gray-700 bg-bitaccess-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-bitaccess-gold" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your general preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Dark Mode</h3>
                        <p className="text-xs text-gray-400">Always use dark mode theme</p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Display Currency</h3>
                        <p className="text-xs text-gray-400">Choose your preferred currency</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-bitaccess-gold text-bitaccess-gold">USD</Button>
                        <Button size="sm" variant="outline">EUR</Button>
                        <Button size="sm" variant="outline">BTC</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Language</h3>
                        <p className="text-xs text-gray-400">Select your preferred language</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-bitaccess-gold text-bitaccess-gold">English</Button>
                        <Button size="sm" variant="outline">日本語</Button>
                        <Button size="sm" variant="outline">Español</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <Card className="border-gray-700 bg-bitaccess-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-bitaccess-gold" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Transaction Alerts</h3>
                        <p className="text-xs text-gray-400">Receive notifications for transactions</p>
                      </div>
                      <Switch id="transaction-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Staking Rewards</h3>
                        <p className="text-xs text-gray-400">Get notified about staking rewards</p>
                      </div>
                      <Switch id="staking-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Marketing</h3>
                        <p className="text-xs text-gray-400">Receive marketing communications</p>
                      </div>
                      <Switch id="marketing-alerts" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card className="border-gray-700 bg-bitaccess-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-bitaccess-gold" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Session Timeout</h3>
                        <p className="text-xs text-gray-400">Automatically disconnect after inactivity</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-bitaccess-gold text-bitaccess-gold">30m</Button>
                        <Button size="sm" variant="outline">1h</Button>
                        <Button size="sm" variant="outline">3h</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Transaction Confirmation</h3>
                        <p className="text-xs text-gray-400">Require confirmation for all transactions</p>
                      </div>
                      <Switch id="transaction-confirmation" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive" className="w-full">Revoke All App Permissions</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="network" className="mt-6">
                <Card className="border-gray-700 bg-bitaccess-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-bitaccess-gold" />
                      Network Settings
                    </CardTitle>
                    <CardDescription>
                      Manage blockchain network preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Current Network</h3>
                        <p className="text-xs text-gray-400">Connected to {networkInfo.name}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-500">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <h3 className="text-sm font-medium">Gas Price Strategy</h3>
                        <p className="text-xs text-gray-400">Select transaction fee strategy</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Slow</Button>
                        <Button size="sm" variant="outline" className="border-bitaccess-gold text-bitaccess-gold">Medium</Button>
                        <Button size="sm" variant="outline">Fast</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Auto-connect to {networkInfo.name}</h3>
                        <p className="text-xs text-gray-400">Automatically switch to {networkInfo.name} when connecting</p>
                      </div>
                      <Switch id="auto-network" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;

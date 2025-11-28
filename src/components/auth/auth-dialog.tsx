
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" placeholder="m@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" type="password" />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}

function SignUpForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input id="signup-email" type="email" placeholder="m@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input id="signup-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input id="signup-confirm-password" type="password" />
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}

type AuthDialogProps = {
  children: React.ReactNode;
  defaultTab?: 'login' | 'signup';
};

export function AuthDialog({ children, defaultTab = 'login' }: AuthDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Tabs defaultValue={defaultTab} className="w-full">
          <DialogHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login" className="pt-4">
              <DialogTitle className="text-2xl font-bold mb-1 text-center">Welcome Back!</DialogTitle>
              <DialogDescription className="text-center mb-6">Sign in to your account to continue.</DialogDescription>
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="pt-4">
            <DialogTitle className="text-2xl font-bold mb-1 text-center">Create an Account</DialogTitle>
            <DialogDescription className="text-center mb-6">Get started with Sharafiya Tourism today.</DialogDescription>
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

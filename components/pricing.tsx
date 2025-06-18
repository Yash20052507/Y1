import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing Plans</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Choose the perfect plan for your needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="text-gray-500 dark:text-gray-400">For individuals just getting started</p>
            </div>
            <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
              <span className="text-3xl font-bold tracking-tight">$9</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>5 skill packs included</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>100 chat messages per day</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Access to public marketplace</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Basic support</span>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-semibold text-primary-foreground">
              Most Popular
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400">For professionals and small teams</p>
            </div>
            <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
              <span className="text-3xl font-bold tracking-tight">$29</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>20 skill packs included</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Unlimited chat messages</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Create custom skill packs</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>API access</span>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-gray-500 dark:text-gray-400">For organizations with advanced needs</p>
            </div>
            <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
              <span className="text-3xl font-bold tracking-tight">$99</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Unlimited skill packs</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Unlimited chat messages</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Private skill pack marketplace</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Custom integrations</span>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/register">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

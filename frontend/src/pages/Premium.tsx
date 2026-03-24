// frontend/src/pages/Premium.tsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useAuthStore } from '../store/authStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const PremiumFeatures = () => {
  const { user } = useAuthStore();

  const handleUpgrade = async () => {
    const res = await api.post('/premium/create-checkout-session');
    window.location.href = res.data.url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <span className="text-3xl font-bold text-white">⭐</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SamChat Premium
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Unlock exclusive features and support the future of messaging
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FeatureCard 
            icon="✅" 
            title="Read Receipts Control" 
            description="Turn off seen status for privacy" 
          />
          <FeatureCard 
            icon="🛡️️" 
            title="Advanced Privacy" 
            description="Hide online status & last seen" 
          />
          <FeatureCard 
            icon="💾" 
            title="Cloud Backup" 
            description="Automatic chat & media backup" 
          />
          <FeatureCard 
            icon="⚡" 
            title="Priority Delivery" 
            description="Faster message sync & delivery" 
          />
        </div>

        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 inline-block mb-8">
            <div className="text-4xl font-bold text-white mb-2">$4.99</div>
            <div className="text-white/90">per month</div>
          </div>
          
          <button
            onClick={handleUpgrade}
            className="bg-white text-purple-600 px-12 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
          >
            {user?.premium ? 'Manage Subscription' : 'Upgrade to Premium'}
          </button>
        </div>
      </div>
    </div>
  );
};

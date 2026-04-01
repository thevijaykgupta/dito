export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    mrp?: number;
    originalPrice?: number;
    category: string;
    condition: 'new' | 'used' | 'refurbished';
    images: string[];
    listingType: 'sell' | 'rent';
    securityDeposit?: number;
    additionalMaterials?: {
        type: 'ppt' | 'report' | 'poster' | 'other';
        title: string;
        description: string;
    }[];
    seller: {
        id: string;
        name: string;
        profilePicture?: string;
        isVerified?: boolean;
        rating?: number;
        reviews?: number;
    };
    location: string;
    floor: string;
    isRentable: boolean;
    rentPrice?: number;
    rentDuration?: string;
    isAvailable: boolean;
    requiresApproval?: boolean;
    createdAt: Date;
    views: number;
    likes: number;
    listingStatus?: 'active' | 'sold' | 'deleted';
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    hostel: string;
    wing: string;
    room: string;
    isVerified: boolean;
    isBanned: boolean;
    rating?: number;
    reviews?: number;
    totalListings: number;
    totalSales: number;
    totalRentals: number;
    createdAt: string;
    profileImage?: string;
    messCardImage?: string;
}

export interface Transaction {
    id: string;
    productId: string;
    sellerId: string;
    buyerId: string;
    amount: number;
    commission: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled' | 'refunded';
    paymentMethod: 'upi' | 'cash';
    upiId?: string;
    createdAt: string;
    completedAt?: string;
    chatEnabled: boolean;
    whatsappEnabled: boolean;
}

export interface Rental {
    id: string;
    productId: string;
    ownerId: string;
    renterId: string;
    rentAmount: number;
    duration: 'hourly' | 'daily' | 'weekly' | 'monthly';
    startDate: string;
    endDate: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    deposit?: number;
    commission: number;
    totalAmount: number;
    createdAt: string;
}

export interface ChatMessage {
    id: string;
    transactionId: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    messageType: 'text' | 'image' | 'location';
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
}

export interface AdminStats {
    totalUsers: number;
    activeListings: number;
    totalSales: number;
    commissionEarned: number;
    pendingApprovals: number;
    reportedItems: number;
    bannedUsers: number;
    activeChats: number;
    totalTransactions: number;
    totalRentals: number;
}

export interface Report {
    id: string;
    productId: string;
    reporterId: string;
    reason: string;
    description: string;
    status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
    createdAt: string;
    resolvedAt?: string;
    adminNotes?: string;
}

export interface Announcement {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'maintenance' | 'update';
    isActive: boolean;
    sendPushNotification: boolean;
    showOnHomepage: boolean;
    createdAt: string;
    expiresAt?: string;
}

export interface CommissionSettings {
    defaultRate: number;
    minimumAmount: number;
    maximumAmount: number;
    adminUpiId: string;
    sellerUpiId: string;
}

export interface ChatRestriction {
    userId: string;
    isMuted: boolean;
    muteReason?: string;
    muteExpiresAt?: string;
    mutedBy?: string;
    mutedAt?: string;
}

export interface SystemSettings {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    chatEnabled: boolean;
    requireAdminApproval: boolean;
    filterInappropriateContent: boolean;
    termsOfService: string;
    communityGuidelines: string;
    commissionSettings: CommissionSettings;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
}

export interface SearchFilters {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    condition?: string;
    location?: string;
    sortBy?: 'price' | 'date' | 'rating' | 'popularity';
    sortOrder?: 'asc' | 'desc';
    isRental?: boolean;
    tags?: string[];
}

export interface PaymentMethod {
    id: string;
    type: 'upi' | 'cash';
    upiId?: string;
    isDefault: boolean;
    isActive: boolean;
}

export interface UserStats {
    totalListings: number;
    activeListings: number;
    totalSales: number;
    totalRentals: number;
    totalEarnings: number;
    totalSpent: number;
    rating: number;
    memberSince: string;
    lastActive: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    unlockedAt?: string;
    progress?: number;
    maxProgress?: number;
}

export interface MessCard {
    id: string;
    userId: string;
    imageUrl: string;
    hostel: string;
    wing: string;
    room: string;
    isVerified: boolean;
    verifiedBy?: string;
    verifiedAt?: string;
    createdAt: string;
} 

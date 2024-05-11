import { subMonths } from "date-fns";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DataRepository
{
    // Function to get all users
    async getAllUsers()
    {
        const users = await prisma.user.findMany();
        return users;
    }

    // Function to get user by ID
    async getUserById(userId)
    {
        return prisma.user.findUnique({
            where: { id: userId }
        });
    }

    // Function to create a new user
    async createUser(data)
    {
        return prisma.user.create({
            data
        });
    }

    // Function to update user
    async updateUser(userId, data)
    {
        return prisma.user.update({
            where: { id: userId },
            data
        });
    }

    // Function to delete user
    async deleteUser(userId)
    {
        return prisma.user.delete({
            where: { id: userId }
        });
    }

    // Function to get all products
    async getAllProducts()
    {
        return prisma.product.findMany();
    }

    // Function to get products by type
    async getProductsByType(type)
    {
        return prisma.product.findMany({
            where: { type }
        });
    }

    // Function to create a new product
    async createProduct(data)
    {
        return prisma.product.create({
            data
        });
    }

    // Function to update product
    async updateProduct(productId, data)
    {
        return prisma.product.update({
            where: { id: productId },
            data
        });
    }

    // Function to delete product
    async deleteProduct(productId)
    {
        return prisma.product.delete({
            where: { id: productId }
        });
    }

    // Function to get all purchases
    async getAllPurchases()
    {
        return prisma.purchase.findMany();
    }

    // Function to get purchase by ID
    async getPurchaseById(purchaseId)
    {
        return prisma.purchase.findUnique({
            where: { id: purchaseId }
        });
    }

    // Function to create a new purchase
    async createPurchase(data)
    {
        return prisma.purchase.create({
            data
        });
    }

    // Function to update purchase
    async updatePurchase(purchaseId, data)
    {
        return prisma.purchase.update({
            where: { id: purchaseId },
            data
        });
    }

    // Function to delete purchase
    async deletePurchase(purchaseId)
    {
        return prisma.purchase.delete({
            where: { id: purchaseId }
        });
    }



    // Statistic functions

    // In the DataRepository class

    async getAllPurchaseStats()
    {
        const purchases = await prisma.purchase.findMany({
            include: {product: true}
        });
    
        // Calculate total number of purchases and sum of product prices
        const totalPurchases = purchases.length;
        const totalPriceSum = purchases.reduce((sum, purchase) => sum + purchase.product.price, 0);
    
        return {
            purchases: purchases.map(purchase => ({
                purchaseId: purchase.id,
                productId: purchase.product.id,
                productName: purchase.product.name,
                productPrice: purchase.product.price,
                purchaseDate: purchase.purchase_date
            })),
            totalPurchases: totalPurchases,
            totalPriceSum: totalPriceSum
        };
    }

    async getBuyersByLocation()
    {
        return prisma.user.groupBy({
            by: ["state"],
            where: {type: "buyer"},
            _count: { id: true } // Counting users
        });
    }


    async getTopThreeProducts()
    {        
        return prisma.product.groupBy({
            by: ["type"],
            _count: { id: true },
            orderBy: {_count: {id: "desc"}},
            take: 3
        })
    }


    async getAverageProductPrice()
    {
        return await prisma.product.aggregate({
            _avg: {price: true,}
        });
    }


    async getSaleInfo()
    {
        const total_listings = await prisma.product.count();
    
        const sold = await prisma.purchase.count();
    
        const unsold = total_listings - sold;
    
        const selling_success = sold / total_listings;
    
        return {
            total_listings,
            sold,
            unsold,
            selling_success,
        };
    }


    async getTopSellers()
    {
        const purchases = await prisma.purchase.findMany({
            include: {
                product: {
                    select: {
                        id: true,
                        seller: {
                            select: {
                                id: true,
                                name: true,
                                surname: true
                            }
                        }
                    }
                }
            }
        });
    
        const sellerSales = purchases.reduce((acc, purchase) => {
            const sellerId = purchase.product.seller.id;
            if (!acc.has(sellerId)) {
                acc.set(sellerId, { name: purchase.product.seller.name, surname: purchase.product.seller.surname, count: 0 });
            }
            acc.get(sellerId).count++;
            return acc;
        }, new Map());
    
        const sortedSellers = [...sellerSales.values()]
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);
    
        return sortedSellers.map(seller => ({
            [`${seller.name || 'Unknown'} ${seller.surname || 'Seller'}`]: seller.count
        }));
    }
    
}

export default new DataRepository;
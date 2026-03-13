import { PrismaClient, MenuTab } from '@prisma/client';

const prisma = new PrismaClient();

function categoriesConnect(names: string[]) {
  return {
    create: names.map((name) => ({
      category: {
        connectOrCreate: { where: { name }, create: { name } },
      },
    })),
  };
}

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.restaurantCategory.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.category.deleteMany();

  const pizza = await prisma.restaurant.create({
    data: {
      name: 'The Pizza Hub',
      categories: categoriesConnect(['Italiana', 'Pizza']),
      rating: 4.8,
      delivery_fee: 'R$ 2,99',
      delivery_time: '20-30 min',
      distance: '1.2 km',
      icon_name: 'pizza',
      icon_color: '#E53935',
      promoted: true,
      cover_image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    },
  });

  const sushi = await prisma.restaurant.create({
    data: {
      name: 'Sushi Samurai',
      categories: categoriesConnect(['Japonesa', 'Sushi']),
      rating: 4.6,
      delivery_fee: 'Grátis',
      delivery_time: '35-50 min',
      distance: '2.8 km',
      icon_name: 'fish',
      icon_color: '#1976D2',
      promoted: false,
      cover_image:
        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    },
  });

  const burger = await prisma.restaurant.create({
    data: {
      name: 'Burger Bros',
      categories: categoriesConnect(['Americana', 'Burger']),
      rating: 4.5,
      delivery_fee: 'R$ 4,99',
      delivery_time: '25-40 min',
      distance: '0.9 km',
      icon_name: 'hamburger',
      icon_color: '#FF6F61',
      promoted: false,
      cover_image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    },
  });

  const green = await prisma.restaurant.create({
    data: {
      name: 'Green Bowl',
      categories: categoriesConnect(['Saudável', 'Fit']),
      rating: 4.7,
      delivery_fee: 'R$ 1,99',
      delivery_time: '15-25 min',
      distance: '0.5 km',
      icon_name: 'leaf',
      icon_color: '#4CAF50',
      promoted: false,
      cover_image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    },
  });

  await prisma.menuItem.createMany({
    data: [
      // The Pizza Hub
      {
        restaurant_id: pizza.id,
        name: 'Truffle Mushroom Risotto',
        description:
          'Arroz arbóreo cremoso com cogumelos selvagens e óleo de trufa.',
        price: 12.9,
        tab: MenuTab.popular,
        icon_name: 'bowl-mix',
        image:
          'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
        rating: 4.9,
      },
      {
        restaurant_id: pizza.id,
        name: 'Classic Margherita Pizza',
        description:
          'Mussarela de búfala fresca, tomates san marzano e manjericão.',
        price: 14.5,
        tab: MenuTab.popular,
        icon_name: 'pizza',
        image:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
        rating: 4.8,
      },
      {
        restaurant_id: pizza.id,
        name: 'Pesto Genovese Pasta',
        description:
          'Linguine artesanal com pesto de manjericão e pinhões torrados.',
        price: 13.2,
        tab: MenuTab.popular,
        icon_name: 'noodles',
        image:
          'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
        rating: 4.7,
      },
      {
        restaurant_id: pizza.id,
        name: 'Pepperoni Especial',
        description: 'Molho de tomate, mussarela e pepperoni importado.',
        price: 16.9,
        tab: MenuTab.mains,
        icon_name: 'pizza',
        image:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
        rating: 4.6,
      },
      {
        restaurant_id: pizza.id,
        name: 'Tiramisù',
        description: 'Sobremesa italiana clássica com mascarpone e café.',
        price: 8.5,
        tab: MenuTab.desserts,
        icon_name: 'cake',
        image:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
        rating: 4.8,
      },
      {
        restaurant_id: pizza.id,
        name: 'Suco de Limão',
        description: 'Suco natural gelado 500ml.',
        price: 6.0,
        tab: MenuTab.drinks,
        icon_name: 'cup',
        image:
          'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
        rating: 4.5,
      },
      // Sushi Samurai
      {
        restaurant_id: sushi.id,
        name: 'Combo Salmão 20 peças',
        description: 'Niguiri, uramaki e sashimi de salmão fresco.',
        price: 42.9,
        tab: MenuTab.popular,
        icon_name: 'fish',
        image:
          'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
        rating: 4.9,
      },
      {
        restaurant_id: sushi.id,
        name: 'Hot Roll Especial',
        description: 'Camarão empanado, cream cheese e molho teriyaki.',
        price: 29.9,
        tab: MenuTab.popular,
        icon_name: 'food',
        image:
          'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80',
        rating: 4.7,
      },
      {
        restaurant_id: sushi.id,
        name: 'Temaki Atum',
        description: 'Cone de alga com atum, pepino e cebolinha.',
        price: 18.5,
        tab: MenuTab.mains,
        icon_name: 'food-variant',
        image:
          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80',
        rating: 4.6,
      },
      {
        restaurant_id: sushi.id,
        name: 'Missoshiro',
        description: 'Sopa de missô tradicional com tofu e alga.',
        price: 7.0,
        tab: MenuTab.drinks,
        icon_name: 'bowl-mix',
        image:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
        rating: 4.4,
      },
      {
        restaurant_id: sushi.id,
        name: 'Mochi de Morango',
        description: 'Bolinho de arroz japonês recheado com sorvete.',
        price: 9.9,
        tab: MenuTab.desserts,
        icon_name: 'cake-variant',
        image:
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
        rating: 4.8,
      },
      // Burger Bros
      {
        restaurant_id: burger.id,
        name: 'Classic Smash Burger',
        description: 'Blend 160g, queijo cheddar, picles e molho especial.',
        price: 22.9,
        tab: MenuTab.popular,
        icon_name: 'hamburger',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
        rating: 4.8,
      },
      {
        restaurant_id: burger.id,
        name: 'BBQ Bacon Burger',
        description: 'Blend 200g, bacon crocante, cebola caramelizada e BBQ.',
        price: 27.9,
        tab: MenuTab.popular,
        icon_name: 'hamburger',
        image:
          'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80',
        rating: 4.9,
      },
      {
        restaurant_id: burger.id,
        name: 'Batata Frita Temperada',
        description: 'Porção 200g com tempero especial da casa.',
        price: 12.0,
        tab: MenuTab.popular,
        icon_name: 'food',
        image:
          'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
        rating: 4.6,
      },
      {
        restaurant_id: burger.id,
        name: 'Chicken Crispy',
        description: 'Frango crocante, alface, tomate e maionese de ervas.',
        price: 19.9,
        tab: MenuTab.mains,
        icon_name: 'food-drumstick',
        image:
          'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
        rating: 4.7,
      },
      {
        restaurant_id: burger.id,
        name: 'Milk Shake Oreo',
        description: 'Sorvete de baunilha, leite e Oreo triturado 400ml.',
        price: 14.9,
        tab: MenuTab.drinks,
        icon_name: 'cup',
        image:
          'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
        rating: 4.7,
      },
      {
        restaurant_id: burger.id,
        name: 'Brownie com Sorvete',
        description: 'Brownie quente com sorvete de baunilha e calda.',
        price: 11.9,
        tab: MenuTab.desserts,
        icon_name: 'cake',
        image:
          'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80',
        rating: 4.8,
      },
      // Green Bowl
      {
        restaurant_id: green.id,
        name: 'Açaí Bowl Tropical',
        description: 'Açaí com granola, banana, morango e mel orgânico.',
        price: 19.9,
        tab: MenuTab.popular,
        icon_name: 'bowl-mix',
        image:
          'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80',
        rating: 4.9,
      },
      {
        restaurant_id: green.id,
        name: 'Buddha Bowl Vegano',
        description: 'Grão-de-bico, quinoa, legumes assados e tahine.',
        price: 24.9,
        tab: MenuTab.popular,
        icon_name: 'leaf',
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
        rating: 4.8,
      },
      {
        restaurant_id: green.id,
        name: 'Wrap Integral Frango',
        description: 'Frango grelhado, alface, tomate e molho de iogurte.',
        price: 18.5,
        tab: MenuTab.mains,
        icon_name: 'food-variant',
        image:
          'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
        rating: 4.6,
      },
      {
        restaurant_id: green.id,
        name: 'Smoothie Verde',
        description: 'Espinafre, banana, maçã e gengibre 350ml.',
        price: 12.9,
        tab: MenuTab.drinks,
        icon_name: 'cup',
        image:
          'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80',
        rating: 4.7,
      },
      {
        restaurant_id: green.id,
        name: 'Pudim de Chia',
        description: 'Chia com leite de coco e calda de frutas vermelhas.',
        price: 9.9,
        tab: MenuTab.desserts,
        icon_name: 'cake-variant',
        image:
          'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80',
        rating: 4.5,
      },
    ],
  });

  console.log(
    'Seed concluído: 4 restaurantes, 8 categorias e 22 itens inseridos.',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

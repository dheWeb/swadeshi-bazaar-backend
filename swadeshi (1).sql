-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 07:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swadeshi`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` bigint(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(11) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `totalItems` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `selectedAddress` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`selectedAddress`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `items`, `totalAmount`, `totalItems`, `user_id`, `paymentMethod`, `status`, `selectedAddress`) VALUES
(1, '\"shoes\"', NULL, NULL, NULL, 'none', 'pending', '\"mohali\"');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discountPercentage` int(11) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `stock` int(11) DEFAULT 0,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `images` text NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `review_count` int(11) DEFAULT 0,
  `ProductCode` varchar(50) DEFAULT NULL,
  `ProductCategory` varchar(255) DEFAULT NULL,
  `ProductSubCategory` varchar(255) DEFAULT NULL,
  `ProductBrand` varchar(255) DEFAULT NULL,
  `ProductColor` varchar(50) DEFAULT NULL,
  `ProductSize` varchar(50) DEFAULT NULL,
  `ProductWeight` varchar(50) DEFAULT NULL,
  `ProductMaterial` varchar(255) DEFAULT NULL,
  `ProductQuantity` int(11) DEFAULT NULL,
  `ProductUnit` varchar(50) DEFAULT NULL,
  `ProductPrice` decimal(10,2) DEFAULT NULL,
  `SalesPrice` decimal(10,2) DEFAULT NULL,
  `ProductDiscount` decimal(5,2) DEFAULT NULL,
  `ProductDiscountType` varchar(50) DEFAULT NULL,
  `ProductTax` decimal(5,2) DEFAULT NULL,
  `ProductTaxType` varchar(50) DEFAULT NULL,
  `ProductShippingCharge` decimal(10,2) DEFAULT NULL,
  `ProductShippingChargeType` varchar(50) DEFAULT NULL,
  `ProductShippingTime` varchar(50) DEFAULT NULL,
  `ProductShippingTimeType` varchar(50) DEFAULT NULL,
  `ProductShippingLocation` varchar(255) DEFAULT NULL,
  `ProductShippingLocationType` varchar(50) DEFAULT NULL,
  `ProductShippingReturnPolicy` varchar(255) DEFAULT NULL,
  `ProductShippingReturnPolicyType` varchar(50) DEFAULT NULL,
  `ProductShippingReturnPolicyDescription` varchar(255) DEFAULT NULL,
  `ProductShippingReturnPolicyDescriptionType` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `title`, `description`, `price`, `discountPercentage`, `rating`, `stock`, `brand`, `category`, `thumbnail`, `images`, `deleted`, `review_count`, `ProductCode`, `ProductCategory`, `ProductSubCategory`, `ProductBrand`, `ProductColor`, `ProductSize`, `ProductWeight`, `ProductMaterial`, `ProductQuantity`, `ProductUnit`, `ProductPrice`, `SalesPrice`, `ProductDiscount`, `ProductDiscountType`, `ProductTax`, `ProductTaxType`, `ProductShippingCharge`, `ProductShippingChargeType`, `ProductShippingTime`, `ProductShippingTimeType`, `ProductShippingLocation`, `ProductShippingLocationType`, `ProductShippingReturnPolicy`, `ProductShippingReturnPolicyType`, `ProductShippingReturnPolicyDescription`, `ProductShippingReturnPolicyDescriptionType`) VALUES
(1, 'nike air jordan', 'best quality sneakers', 15000.00, 10, 5.0, 100, 'nike', 'shoes', 'jordan 11', '', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `review` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `name` varchar(255) DEFAULT NULL,
  `addresses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`addresses`)),
  `orders` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orders`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `name`, `addresses`, `orders`) VALUES
(1, 'sonal', 'kandari', 'kandarisonal21200@gmail.com', '$2b$10$jiFp2wvPUmDF8MOANgfSbuxhoIFPpteWLjslXcQr6WgGh5fVzy5Du', 'user', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

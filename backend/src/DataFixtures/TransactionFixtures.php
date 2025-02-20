<?php

namespace App\DataFixtures;

use App\Entity\Transaction;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use DateTime;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class TransactionFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = [
            'John Doe',
            'Jane Smith',
        ];

        // Define possible values for type, description, and payment method
        $types = ['income', 'expense'];
        $descriptions = ['Netflix', 'Car Repair', 'Rent', 'Groceries'];
        $paymentMethods = ['paypal', 'bank account', 'credit card'];

        $transactions = [];

        foreach ($users as $username) {
            // Generate 6 transactions for the current month (February 2025)
            for ($i = 0; $i < 6; $i++) {
                $date = new DateTime('2025-02-' . rand(1, 28));
                $transactions[] = [
                    'username' => $username,
                    'amount' => rand(10, 500),
                    'date' => $date->format('j.m.Y'),
                    'type' => $types[array_rand($types)],
                    'description' => $descriptions[array_rand($descriptions)],
                    'paymentMethod' => $paymentMethods[array_rand($paymentMethods)],
                ];
            }

            // Generate 4 transactions in the last 3 months (Jan 2025, Dec 2024, Nov 2024)
            $months = ['2025-01', '2024-12', '2024-11'];
            for ($i = 0; $i < 4; $i++) {
                $month = $months[array_rand($months)];
                $date = new DateTime($month . '-' . rand(1, 28));
                $transactions[] = [
                    'username' => $username,
                    'amount' => rand(10, 500),
                    'date' => $date->format('j.m.Y'),
                    'type' => $types[array_rand($types)],
                    'description' => $descriptions[array_rand($descriptions)],
                    'paymentMethod' => $paymentMethods[array_rand($paymentMethods)],
                ];
            }

            // Generate 5 transactions in the last 12 months (Oct 2024 to Feb 2024)
            $months = ['2024-10', '2024-09', '2024-08', '2024-07', '2024-06', '2024-05', '2024-04', '2024-03', '2024-02'];
            for ($i = 0; $i < 5; $i++) {
                $month = $months[array_rand($months)];
                $date = new DateTime($month . '-' . rand(1, 28));
                $transactions[] = [
                    'username' => $username,
                    'amount' => rand(10, 500),
                    'date' => $date->format('j.m.Y'),
                    'type' => $types[array_rand($types)],
                    'description' => $descriptions[array_rand($descriptions)],
                    'paymentMethod' => $paymentMethods[array_rand($paymentMethods)],
                ];
            }
        }

        foreach ($transactions as $data) {
            $transaction = new Transaction();
            $transaction->setUsername($data['username']);
            $transaction->setAmount($data['amount']);
            $transaction->setDate($data['date']);
            $transaction->setType($data['type']);
            $transaction->setDescription($data['description']);
            $transaction->setPaymentMethod($data['paymentMethod']);

            $manager->persist($transaction);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}

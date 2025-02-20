<?php

namespace App\Controller;

use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TransactionController extends AbstractController
{
    #[Route('/transactions/add', name: 'add_transaction', methods: ['POST'])]
    public function addTransaction(
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
    ) : JsonResponse {
        $data = json_decode($request->getContent(), true);
        if(!$data || !isset($data["username"]) || !isset($data["type"]) || !isset($data["amount"]) || !isset($data["date"]) || !isset($data["paymentMethod"]) || !isset($data["description"])){
            return new JsonResponse(["error" => "Missing required fields"], 400);
        }
        $transaction = new Transaction();

        $transaction->setType($data["type"]);
        $transaction->setUsername($data["username"]);
        $transaction->setAmount($data["amount"]);
        $transaction->setDate($data["date"]);
        $transaction->setPaymentMethod($data["paymentMethod"]);
        $transaction->setDescription($data["description"]);

        $errors = $validator->validate($transaction);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(["error" => $errorMessages], 400);
        }
        $entityManager->persist($transaction);
        $entityManager->flush();

        return new JsonResponse(["status" => "transaction added successfully"], 201);
    }
    #[Route('/transactions/get', name: 'get_transactions', methods: ['GET'])]
    public function getTransactions(
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $username = $request->query->get('username');

        // Return an error if no username is provided.
        if (!$username) {
            return new JsonResponse(['error' => 'Username parameter is required'], 400);
        }

        $repository = $entityManager->getRepository(Transaction::class);
        $transactions = $repository->findBy(['username' => $username]);

        $data = [];
        foreach ($transactions as $transaction) {
            $data[] = [
                'id' => $transaction->getId(),
                'username' => $transaction->getUsername(), // included for clarity
                'date' => $transaction->getDate(),
                'amount' => $transaction->getAmount(),
                'paymentMethod' => $transaction->getPaymentMethod(),
                'description' => $transaction->getDescription(),
                'type' => $transaction->getType()
            ];
        }

        return new JsonResponse($data, 200);
    }

    #[Route('/transactions/delete', name: 'delete_transaction', methods: ['DELETE'])]
        public function deleteTransaction(
            Request $request,
            EntityManagerInterface $entityManager,
        ) : JsonResponse {

            $data = json_decode($request->getContent(), true);

            if (!isset($data['id']) || !isset($data['username'])) {
                return new JsonResponse(["error" => "Missing required fields"], 400);
            }

            $transaction = $entityManager->getRepository(Transaction::class)->findOneBy([
              "id"=>  $data['id'],
              "username"=> $data['username']
            ]);

            if(!$transaction){
                return new JsonResponse(["error" => "Transaction not found"], 404);
            }

            $entityManager->remove($transaction);
            $entityManager->flush();

            return new JsonResponse(["status" => "transaction deleted successfully"], 200);
        }
}
<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/userinformation/update', name: 'user_data', methods: ['POST'])]
    public function updateUserInformation(
        Request $request,
        EntityManagerInterface $entityManager,
        validatorInterface $validator,
    ): JsonResponse
    {

        //Check if all the required fields are entered in the request object
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data["username"])) {
            return new JsonResponse(["error" => "Missing required fields"], 400);
            }

        // Fetch the user from the database
        $user = $entityManager->getRepository(User::class)->find($data["username"]);
        if (!$user) {
            return new JsonResponse(["error" => "User not found"], 404);
        }


        $user->setFirstName($data["firstname"]);
        $user->setLastName($data["lastname"]);
        $user->setEmail($data["email"]);
        $user->setPhonenumber($data["phonenumber"]);
        $user->setAddress($data["address"]);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(["error" => $errorMessages], 400);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(["status" => "user information updated successfully"], 201);

    }

    #[Route('/userinformation/get', name: 'user_data', methods: ['GET'])]
    public function getUserInformation(
        Request $request,
        EntityManagerInterface $entityManager,
    ) : JsonResponse {
        $username = $request->get("username");
        $repository = $entityManager->getRepository(User::class);

        if($username) {
            $transactions = $repository->findBy(["username" => $username]);
        } else {
            $transactions = $repository->findAll();
        }

    }



}
<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'registration', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Check for required fields
        if (!$data || !isset($data["username"]) || !isset($data["password"])) {
            return new JsonResponse(
                ["error" => "Missing required parameters: username and password"],
                JsonResponse::HTTP_BAD_REQUEST // 400
            );
        }

        // Create and populate the user
        $user = new User();
        $user->setUsername($data["username"]);

        // Hash the password
        $hashedPassword = $passwordHasher->hashPassword($user, $data["password"]);
        $user->setPassword($hashedPassword);

        // Validate the user entity
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(
                ['errors' => $errorMessages],
                JsonResponse::HTTP_BAD_REQUEST // 400
            );
        }

        // Persist the user
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(
            ["status" => "User created successfully"],
            JsonResponse::HTTP_CREATED // 201
        );
    }
}
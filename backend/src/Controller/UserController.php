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
    #[Route('/userinformation/post', name: 'post_user_data', methods: ['POST'])]
    public function updateUserInformation(
        Request $request,
        EntityManagerInterface $entityManager,
        validatorInterface $validator,
    ): JsonResponse
    {

        //Check if all the required fields are entered in the request object
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data["name"])) {
            return new JsonResponse(["error" => "Missing required fields"], 400);
            }

        // Fetch the user from the database
        $user = $entityManager->getRepository(User::class)->find($data["name"]);
        if (!$user) {
            return new JsonResponse(["error" => "User not found"], 404);
        }


        $user->setFirstname($data["firstname"]);
        $user->setLastname($data["lastname"]);
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

    #[Route('/userinformation/get', name: 'get_user_data', methods: ['GET'])]
    public function getUserInformation(
        Request $request,
        EntityManagerInterface $entityManager,
    ) : JsonResponse {
        $name = $request->get('name');

        if($name) {

            $repository = $entityManager->getRepository(User::class);
            $user = $repository->findOneBy(['name' => $name]);
            $data = [];

            $data[] = [
                "firstname" => $user->getFirstname(),
                "lastname" => $user->getLastname(),
                "email" => $user->getEmail(),
                "phoneNumber" => $user->getPhonenumber(),
                "address"=> $user->getAddress(),
            ];
            return new JsonResponse($data, 200, ['Content-Type' => 'application/json']);
        } else {
            return new JsonResponse(["error" => "No Username provided"], 404);
        }

    }


}
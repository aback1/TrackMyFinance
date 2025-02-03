<?php

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

class UserService
{
    private UserPasswordHasherInterface $passwordHasher;
    private EntityManagerInterface $entityManager;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager){
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }

    public function createUser(string $name, string $plaintextPassword): User
    {
        $user = new User();
        $user->setName($name);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user, $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setId(Uuid::v7());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}
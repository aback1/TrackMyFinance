<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
class Transaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 16)]
    private string $username;

    #[ORM\Column(type: 'string', length: 255)]
    private string $description;

    #[ORM\Column(type: 'string', length: 10)]
    #[Assert\Length(
        min: 9,
        max: 10,
        exactMessage: "The date must be either 9 or 10 characters long."
    )]
    #[Assert\Regex(
        pattern: "/^\d{1,2}\.\d{2}\.\d{4}$/",
        message: "The date must be in the format 'd.MM.yyyy' or 'dd.MM.yyyy'."
    )]
    private string $date;

    #[ORM\Column(type: 'string', length: 10)]
    private string $type; // 'income' or 'expense'

    #[ORM\Column(type: 'string', length: 50)]
    private string $paymentMethod; // 'bank account', 'paypal', etc.

    #[ORM\Column(type: 'float')]
    private float $amount;

    // Getters and Setters

    public function getId(): int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }


    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getDate(): string
    {
        return $this->date;
    }

    public function setDate(string $date): static
    {
        $this->date = $date;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;
        return $this;
    }

    public function getPaymentMethod(): string
    {
        return $this->paymentMethod;
    }

    public function setPaymentMethod(string $paymentMethod): static
    {
        $this->paymentMethod = $paymentMethod;
        return $this;
    }

    public function getAmount(): float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;
        return $this;
    }
}
<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250220111815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE users (username VARCHAR(16) NOT NULL, password VARCHAR(24) NOT NULL, email VARCHAR(50) DEFAULT NULL, phonenumber VARCHAR(32) DEFAULT NULL, firstname VARCHAR(32) DEFAULT NULL, lastname VARCHAR(32) DEFAULT NULL, address VARCHAR(50) DEFAULT NULL, PRIMARY KEY(username))');
        $this->addSql('DROP TABLE "user"');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE "user" (username VARCHAR(16) NOT NULL, password VARCHAR(24) NOT NULL, email VARCHAR(50) DEFAULT NULL, phonenumber VARCHAR(32) DEFAULT NULL, firstname VARCHAR(32) DEFAULT NULL, lastname VARCHAR(32) DEFAULT NULL, address VARCHAR(50) DEFAULT NULL, PRIMARY KEY(username))');
        $this->addSql('DROP TABLE users');
    }
}

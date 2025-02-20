<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250220111504 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE movies (imdb_id VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, year INT NOT NULL, poster VARCHAR(255) NOT NULL, type VARCHAR(7) NOT NULL, rating DOUBLE PRECISION DEFAULT NULL, watched BOOLEAN NOT NULL, PRIMARY KEY(imdb_id, username, title))');
        $this->addSql('CREATE TABLE transaction (id SERIAL NOT NULL, username VARCHAR(16) NOT NULL, description VARCHAR(255) NOT NULL, date VARCHAR(10) NOT NULL, type VARCHAR(10) NOT NULL, payment_method VARCHAR(50) NOT NULL, amount DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (username VARCHAR(16) NOT NULL, password VARCHAR(24) NOT NULL, email VARCHAR(50) DEFAULT NULL, phonenumber VARCHAR(32) DEFAULT NULL, firstname VARCHAR(32) DEFAULT NULL, lastname VARCHAR(32) DEFAULT NULL, address VARCHAR(50) DEFAULT NULL, PRIMARY KEY(username))');
        $this->addSql('DROP TABLE spendings');
        $this->addSql('DROP TABLE users');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE spendings (month VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, income INT NOT NULL, rentcosts INT NOT NULL, sidecosts INT NOT NULL, foodanddrinkscosts INT NOT NULL, hobbycosts INT NOT NULL, savingscosts INT NOT NULL, mobilitycosts INT NOT NULL, insurancecosts INT NOT NULL, PRIMARY KEY(month, username))');
        $this->addSql('CREATE TABLE users (id VARCHAR(36) NOT NULL, name VARCHAR(128) NOT NULL, password VARCHAR(128) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_1483a5e95e237e06 ON users (name)');
        $this->addSql('DROP TABLE movies');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE "user"');
    }
}

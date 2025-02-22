<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250222183416 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users DROP CONSTRAINT users_pkey');
        $this->addSql('ALTER TABLE users RENAME COLUMN username TO name');
        $this->addSql('ALTER TABLE users ADD PRIMARY KEY (name)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX users_pkey');
        $this->addSql('ALTER TABLE users RENAME COLUMN name TO username');
        $this->addSql('ALTER TABLE users ADD PRIMARY KEY (username)');
    }
}

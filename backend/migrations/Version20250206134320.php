<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250206134320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE spendings (month DATE NOT NULL, username VARCHAR(255) NOT NULL, income INT NOT NULL, rentcosts INT NOT NULL, sidecosts INT NOT NULL, foodanddrinkscosts INT NOT NULL, hobbycosts INT NOT NULL, savingscosts INT NOT NULL, mobilitycosts INT NOT NULL, insurancecosts INT NOT NULL, PRIMARY KEY(month, username))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E362258E8EB61006 ON spendings (month)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E362258EF85E0677 ON spendings (username)');
        $this->addSql('ALTER TABLE users ALTER id TYPE VARCHAR(36)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E95E237E06 ON users (name)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE spendings');
        $this->addSql('DROP INDEX UNIQ_1483A5E95E237E06');
        $this->addSql('ALTER TABLE "users" ALTER id TYPE VARCHAR(255)');
    }
}

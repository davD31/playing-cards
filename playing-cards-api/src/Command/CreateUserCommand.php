<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'Creates a test user',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
{
    // Liste des utilisateurs à créer
    $users = [
        [
            'username' => 'admin',
            'password' => 'admin',
            'email' => 'admin@example.com',
            'firstName' => 'Admin',
            'lastName' => 'User'
        ],
        [
            'username' => 'david',
            'password' => 'david123',
            'email' => 'david@example.com',
            'firstName' => 'David',
            'lastName' => 'Dupont'
        ],
        [
            'username' => 'sylvie',
            'password' => 'sylvie123',
            'email' => 'sylvie@example.com',
            'firstName' => 'Sylvie',
            'lastName' => 'Martin'
        ],
        [
            'username' => 'sasha',
            'password' => 'sasha123',
            'email' => 'sasha@example.com',
            'firstName' => 'Sasha',
            'lastName' => 'Dubois'
        ]
    ];

    foreach ($users as $userData) {
        // Vérifier si l'utilisateur existe déjà
        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['username' => $userData['username']]);

        if ($existingUser) {
            $output->writeln('⚠️  Utilisateur "' . $userData['username'] . '" existe déjà, ignoré.');
            continue;
        }

        // Créer le nouvel utilisateur
        $user = new User();
        $user->setUsername($userData['username']);
        $user->setEmail($userData['email']);
        $user->setFirstName($userData['firstName']);
        $user->setLastName($userData['lastName']);
        
        // Hash le mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($user, $userData['password']);
        $user->setPassword($hashedPassword);
        
        // Sauvegarde en base de données
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $output->writeln('✅ Utilisateur créé : ' . $userData['username'] . ' / ' . $userData['password']);
    }

    $output->writeln('');
    $output->writeln('🎉 Tous les utilisateurs ont été créés !');

    return Command::SUCCESS;
}
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Entity\User;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to PlayingCards API',
            'version' => '1.0',
        ]);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return $this->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
            ],
        ]);
    }

    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Not authenticated',
            ], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
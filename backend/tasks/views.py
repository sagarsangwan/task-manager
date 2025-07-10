from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

from .responseFromAi import classify_priority


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()
        priority = classify_priority(task.title, task.description)
        print(priority, "respnse from aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")

        task.priority = (
            priority if priority in dict(Task.PRIORITY_CHOICES) else "Medium"
        )
        task.save()

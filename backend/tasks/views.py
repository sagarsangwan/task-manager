from rest_framework import viewsets
from .models import Task, Tag
from .serializers import TaskSerializer

from .responseFromAi import classify_priority, get_tags_from_gemini


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()
        priority = classify_priority(task.title, task.description)

        task.priority = (
            priority if priority in dict(Task.PRIORITY_CHOICES) else "Medium"
        )
        tag_names = get_tags_from_gemini(task.title, task.description)
        print(
            tag_names,
            "respnse from aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii tag_names",
        )

        for name in tag_names:
            tag_obj, created = Tag.objects.get_or_create(name=name)
            task.tags.add(tag_obj)
        task.save()

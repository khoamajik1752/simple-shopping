# Generated by Django 4.2.3 on 2023-07-08 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_alter_product_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="description",
            field=models.CharField(max_length=300),
        ),
    ]

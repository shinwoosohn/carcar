# Generated by Django 4.0.3 on 2023-03-07 23:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_saleshistory_buyer_alter_saleshistory_seller'),
    ]

    operations = [
        migrations.RenameField(
            model_name='saleshistory',
            old_name='sold_auto',
            new_name='sold_auto_vin',
        ),
    ]
